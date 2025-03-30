from agents import (GuardAgent, ActionPlanAgent)

class AgentController():
    def __init__(self):
        self.guard_agent = GuardAgent()
        self.action_plan_agent = ActionPlanAgent()
   
    
    def get_response(self, message):

        # Get GuardAgent's response
        guard_agent_response = self.guard_agent.get_response(message)
        print("guard_agent_response")
        print(guard_agent_response)
        if guard_agent_response["decision"] == "not allowed":
            return guard_agent_response
        
        if guard_agent_response["sentiment"] == "negative":
            action_plan_input = self.constructMsgForActionPlanAgent(message, guard_agent_response["sentiment"])
            action_plan_agent_response = self.action_plan_agent.get_response(action_plan_input)
            return action_plan_agent_response
        
    def constructMsgForActionPlanAgent(self, message, sentiment):
        customerInput = "customer_message: " + message +","
        sentimentInput = "sentiment: " + sentiment
        return customerInput + sentimentInput
