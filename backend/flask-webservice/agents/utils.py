import os
import requests


def constructBody(systemPrompt, modelId, projectId):
    body = {
            "input": systemPrompt,
            "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 200,
            "min_new_tokens": 0,
            "repetition_penalty": 1
        },
        "model_id": modelId,
        "project_id": projectId
        }
    return body


def getResponse(body, url, accessToken):
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+accessToken
    }

    response = requests.post(
        url,
        headers=headers,
        json=body
    )

    if response.status_code != 200:
        raise Exception("Non-200 response: " + str(response.text))

    data = response.json()
    return data
