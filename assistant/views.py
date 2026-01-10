from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from groq import Groq 
import os

# Initialize Groq client with error handling for Python compatibility
try:
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
except Exception as e:
    print(f"Warning: Groq client initialization issue: {e}")
    # The client will be initialized on first use if needed
    client = None

@csrf_exempt
def ask(request):
    if request.method == "POST":
        try:
            if client is None:
                return JsonResponse(
                    {"error": "Groq API client not initialized. Check GROQ_API_KEY"},
                    status=500
                )
            
            data = json.loads(request.body)
            question = data.get("question", "").strip()
            
            if not question:
                return JsonResponse(
                    {"error": "Question field is required and cannot be empty"},
                    status=400
                )
            
            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are an AI assistant providing general guidance and best practices for internal insurance operations at a B2B company. Do not assume access to proprietary or internal company data"},
                    {"role": "user", "content": question} 
                ],
                model="llama-3.1-8b-instant"
            )
            answer = chat_completion.choices[0].message.content
            return JsonResponse({"answer": answer})
        
        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON in request body"},
                status=400
            )
        except Exception as e:
            return JsonResponse(
                {"error": f"Server error: {str(e)}"},
                status=500
            )
    
    return JsonResponse(
        {"error": "Only POST method allowed!"},
        status=405
    )

@csrf_exempt
def explain_code(request):
    if request.method == "POST":
        try:
            if client is None:
                return JsonResponse(
                    {"error": "Groq API client not initialized. Check GROQ_API_KEY"},
                    status=500
                )
            
            data = json.loads(request.body)
            code = data.get("code", "")
            language = data.get("language", "python")

            if not code.strip():
                return JsonResponse(
                    {"error": "No code provided!"},
                    status=400
                )

            prompt = f"""
                You are a senior software engineer.

                Explain the following {language} code clearly and concisely.

                Your explanation MUST include:
                1. What this code does (high-level)
                2. Main components (functions/classes)
                3. Execution flow
                4. Potential issues or edge cases

                Code:
                {code}
                """

            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a helpful software engineering assistant."},
                    {"role": "user", "content": prompt}
                ],
                model="llama-3.1-8b-instant",
            )

            explanation = chat_completion.choices[0].message.content

            return JsonResponse({
                "explanation": explanation
            })
        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON in request body"},
                status=400
            )
        except Exception as e:
            return JsonResponse(
                {"error": f"Server error: {str(e)}"},
                status=500
            )

    return JsonResponse(
        {"error": "Only POST allowed"},
        status=405
    )


def read_project_files(project_path, max_files=20):
    collected = []
    count = 0

    for root, dirs, files in os.walk(project_path):
        if "venv" in dirs:
            dirs.remove("venv")
        if "__pycache__" in dirs:
            dirs.remove("__pycache__")

        for file in files:
            if file.endswith(".py"):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                        collected.append(
                            f"\nFILE: {file_path}\n{content}\n"
                        )
                        count += 1
                        if count >= max_files:
                            return collected
                except Exception:
                    continue

    return collected

@csrf_exempt
def project_flow(request):
    if request.method == "POST":
        try:
            if client is None:
                return JsonResponse(
                    {"error": "Groq API client not initialized. Check GROQ_API_KEY"},
                    status=500
                )
            
            data = json.loads(request.body)
            project_path = data.get("project_path", "")

            if not project_path or not os.path.exists(project_path):
                return JsonResponse(
                    {"error": "Invalid project path"},
                    status=400
                )

            files_content = read_project_files(project_path)

            if not files_content:
                return JsonResponse(
                    {"error": "No readable source files found"},
                    status=400
                )

            prompt = f"""
                You are a senior software engineer.

                Analyze the following project files and explain:

                1. What this project does (high-level purpose)
                2. Entry points (where execution starts)
                3. Main execution flow
                4. How components/modules interact
                5. Missing pieces or potential issues

                Project files:
                {''.join(files_content)}
                """

            chat_completion = client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You analyze software projects and explain their flow clearly."},
                    {"role": "user", "content": prompt}
                ],
                model="llama-3.1-8b-instant",
            )

            explanation = chat_completion.choices[0].message.content

            return JsonResponse({
                "project_flow": explanation
            })
        except json.JSONDecodeError:
            return JsonResponse(
                {"error": "Invalid JSON in request body"},
                status=400
            )
        except Exception as e:
            return JsonResponse(
                {"error": f"Server error: {str(e)}"},
                status=500
            )

    return JsonResponse(
        {"error": "Only POST allowed"},
        status=405
    )
