from crewai import Agent, Task
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(model="gpt-3.5-turbo")
from composio_crewai import ComposioToolSet, Action, App

composio_toolset = ComposioToolSet()
tools = composio_toolset.get_tools(apps=[App.GITHUB])

crewai_agent = Agent(
    role="Github Agent",
    goal="""You take action on Github using Github APIs""",
    backstory=(
        "You are AI agent that is responsible for taking actions on Github "
        "on users behalf. You need to take action on Github using Github APIs"
    ),
    verbose=True,
    tools=tools,
    llm=llm,
)

task = Task(
    description="Star a repo SamparkAI/composio on GitHub",
    agent=crewai_agent,
    expected_output="if the star happened"
)

task.execute()


