import requests
from dotenv import load_dotenv
import os
from .utils import constructBody, getResponse
from copy import deepcopy


load_dotenv()
class GuardAgent():
    def __init__(self):
        self.ibm_access_token =  os.getenv("IBM_ACCESS_TOKEN")
        self.ibm_cloud_url =  os.getenv("IBM_CLOUD_URL")
        self.ibm_model_id =  os.getenv("IBM_MODEL_ID")
        self.ibm_project_id =  os.getenv("IBM_PROJECT_ID")

        
    
    def get_response(self,messages):
        print("getting response from guard agent")
        messages = deepcopy(messages)
        url = self.ibm_cloud_url
        body = {
            "input": """You are a helpful AI assistant who monitors messages recieved over a CRM portal.
                    Your task is to determine whether the customer is asking something relevant to a logistics software system.
                    The customer is allowed to:
                    1. Ask questions about the different functionalities of the system.
                    2. Make requests for new features to be added to the system.
                    3. Make complaints about system bugs or downtime or any system related issue affecting their operations.

                    The customer is NOT allowed to:
                    1. Ask questions about anything else other than the logistics software system.
                    2. Ask questions about the staff or confidential company information.

                    Make sure to use the following chain of thought: \"go over each of the points above and make see if the message lies under this point or not. Then you write some your thoughts about what point is this input relevant to.\"

                    Your output should be in a structured json format where each key is a string and each value is a string. Make sure to follow the format exactly:
                    {
                    \"decision\": \"allowed\" or \"not allowed\". Pick one of those. and only write the word.
                    \"message\": leave the message empty \"\" if it'\''s allowed, otherwise write \"Question is irrelevant\"
                    }

        Input: I am receiving duplicate job orders on the system when I search by a job order number.
        Output: allowed

        Input: The system has been slow for the last 2 hours. Please check and rectify the issue.
        Output: allowed

        Input: Let'\''s have dinner tonight. Do you want me to pick you up? Wear something nice
        Output: not allowed

        Input: The system has been slow for the last 2 hours. Please check and rectify the issue.
        Output:""",
            "parameters": {
                "decoding_method": "greedy",
                "max_new_tokens": 200,
                "min_new_tokens": 0,
                "stop_sequences": ["\n\n"],
                "repetition_penalty": 1
            },
            "model_id": self.ibm_model_id,
            "project_id": self.ibm_project_id,
            "moderations": {
                "hap": {
                    "input": {
                        "enabled": True,
                        "threshold": 0.5,
                        "mask": {
                            "remove_entity_value": True
                        }
                    },
                    "output": {
                        "enabled": True,
                        "threshold": 0.5,
                        "mask": {
                            "remove_entity_value": True
                        }
                    }
                },
                "pii": {
                    "input": {
                        "enabled": True,
                        "threshold": 0.5,
                        "mask": {
                            "remove_entity_value": True
                        }
                    },
                    "output": {
                        "enabled": True,
                        "threshold": 0.5,
                        "mask": {
                            "remove_entity_value": True
                        }
                    }
                }
            }
        }

        ai_response = getResponse(body, url, self.ibm_access_token)        
        return ai_response
