from julep import Client
from composio_julep import ComposioToolset, App
import os

julep_api_key = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMmIwY2E4YS00NTkwLTQ0MjctYWNlZC1iMDYwZWYzMDk2ZjQiLCJlbWFpbCI6InNoaXZhMm5hbmkubWFuZ2luYUBnbWFpbC5jb20iLCJpYXQiOjE3MTcyNTkxODksImV4cGlyZXNJbiI6IjF5IiwicmF0ZUxpbWl0UGVyTWludXRlIjozNTAwLCJxdW90YVJlc2V0IjoiMWgiLCJjbGllbnRFbnZpcm9ubWVudCI6InNlcnZlciIsInNlcnZlckVudmlyb25tZW50IjoicHJvZHVjdGlvbiIsInZlcnNpb24iOiJ2MC4yIiwiZXhwIjoxNzQ4ODE2Nzg5fQ.duRu_kFhCYXROQ-KEZQwbELnqnnhmI6fOAcfXvBjbdNpZaDk7lyzLZy5x_ptLRSA5VkbwM1R3pxGsECbCdJbLg" # Replace it
julep_client = Client(api_key=julep_api_key)

toolset = ComposioToolset()
composio_tools = toolset.get_tools(tools=[App.GITHUB])

agent = julep_client.agents.create(
    name="Jessica",
    about="Tech entrepreneur with a focus on sustainability and AI.",
    default_settings={
        "temperature": 0.7,
        "top_p": 1,
        "min_p": 0.01,
        "presence_penalty": 0,
        "frequency_penalty": 0,
        "length_penalty": 1.0,
        "max_tokens": 150
    },
    model="gpt-4-turbo",
    tools=composio_tools,
)

about = """
Sam, a software developer, is passionate about impactful tech. 
At the tech fair, he seeks investors and collaborators for his project.
"""
user = julep_client.users.create(
    name="Sam",
    about=about,
)

situation_prompt = "You are at a tech fair seeking innovative projects."
session = julep_client.sessions.create(user_id=user.id, agent_id=agent.id, situation=situation_prompt)

user_msg = "Could you star the GitHub repository shivamangina/ai_agents_chainlang?"

response = julep_client.sessions.chat(
    session_id=session.id,
    messages=[
        {"role": "user", "content": user_msg, "name": "Sam"}
    ],
    recall=True,
    remember=True
)