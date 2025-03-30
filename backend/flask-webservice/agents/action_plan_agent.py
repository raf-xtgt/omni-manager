import requests
from dotenv import load_dotenv
import os
from .utils import constructBody, getResponse
from copy import deepcopy
import re
import json
load_dotenv()



class ActionPlanAgent():
    def __init__(self):
        self.ibm_access_token =  os.getenv("IBM_ACCESS_TOKEN")
        self.ibm_cloud_url =  os.getenv("IBM_CLOUD_URL")
        self.ibm_model_id =  os.getenv("IBM_MODEL_ID")
        self.ibm_project_id =  os.getenv("IBM_PROJECT_ID")

        
    
    def get_response(self,messages):
        print("getting response from action plan agent")
        messages = deepcopy(messages)
        url = self.ibm_cloud_url
        body = {
            "input": """You are a helpful AI assistant who monitors messages recieved over a CRM portal. You will be given the customer message and the underlying sentiment. If the sentiment is negative, your task is to create a list of actionable steps to alleviate customer pain points.
            Make sure to use the following chain of thought: \"go over each of the points above and make see if the message lies under this point or not. Then you write some your thoughts about what point is this input relevant to.
            Your output should follow the format exactly:
                        
            \"message\":  This is the message sent by the customer,
            \"action1\":  Action 1 is a concise summary of the complaint. Use the message and the sentiment as context to create the best possible summary for the team to address the complaint.
            \"action2\": Action 2 is a short response that informs the customer what steps are being taken to alleviate their pain points.
                        

            Input: \"customer_message\": \"I am receiving duplicate job orders on the system when I search by a job order number.\"
            \"sentiment\":\"negative\"
            Output: \"message\":  \"I am receiving duplicate job orders on the system when I search by a job order number.\",
            \"action1\": \"Bug - Search functionality is returning duplicates.\",
            \"action2\": \"Noted on the issue, our team is working to rectify it.\",

            Input: \"customer_message\": \"The system has been slow for the last 2 hours. Please check and rectify the issue.\"
            \"sentiment\":\"negative\"
            Output: \"message\":  \"The system has been slow for the last 2 hours. Please check and rectify the issue.\",
            \"action1\": \"Server- System slowness affecting customer business operations\", 
            \"action2\": \"Noted on the slowness, we will get our admins to have a look at it.\"]

            Input: \"customer_message\": \"There is discrepancy between the job order and delivery reports. I can see some of the draft job orders been marked as ready for delivery. This is a critical bug in the system.\"
            \"sentiment\":\"negative\"
            Output: \"message\":  \"There is discrepancy between the job order and delivery reports. I can see some of the draft job orders been marked as ready for delivery. This is a critical bug in the system.\",
            \"action1\": \"Bug - Discrepancy between the job order and the delivery reports\",
            \"action2\": \"Noted, we will identify the cause of the discrepancy and inform you. \"

            Input: \"customer_message\": \"My listing for job orders is only showing a 100 rows but there should be around 320 of them. Please help check this issue.\"
            \"sentiment\":\"negative\"
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
        print(ai_response)
        # sanitized_json = self.extract_decision_sentiment(ai_response)        
        return ai_response

    def extract_decision_sentiment(self, response_json):
        generated_text = response_json.get("results", [{}])[0].get("generated_text", "")
        
        # Regular expressions to extract decision and sentiment
        decision_match = re.search(r'"decision"\s*:\s*"(.*?)"', generated_text)
        sentiment_match = re.search(r'"sentiment"\s*:\s*"(.*?)"', generated_text)
        
        extracted_data = {
            "decision": decision_match.group(1) if decision_match else "not allowed",
            "sentiment": sentiment_match.group(1) if sentiment_match else "unknown"
        }
        
        return json.dumps(extracted_data, indent=4)