import requests

url = "http://localhost:8000/uploads"  # URL da API
file_path = "../sales.txt"  # Substitua pelo caminho do arquivo

with open(file_path, "rb") as file:
    files = {
        "file": file,  # Chave precisa ser "file" para o FileInterceptor
    }
    response = requests.post(url, files=files)  # Envia como multipart/form-data

    if response.status_code == 201:
        print("Arquivo enviado com sucesso!")
    else:
        print("Erro:", response.status_code, response.text)