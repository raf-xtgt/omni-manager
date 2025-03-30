from agents import (GuardAgent)

class AgentController():
    def __init__(self):
        self.guard_agent = GuardAgent()
   
    
    def get_response(self, message):

        # Get GuardAgent's response
        guard_agent_response = self.guard_agent.get_response(message)
        print("guard_agent_response")
        print(guard_agent_response)
        if guard_agent_response["decision"] == "not allowed":
            return guard_agent_response
        
        if guard_agent_response["sentiment"] == "negative":
            return "Actionable item list"
        

