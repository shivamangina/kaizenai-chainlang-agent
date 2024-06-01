
from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.chat_models import ChatOpenAI
from reader import SimpleReaderTool

from dotenv import load_dotenv

load_dotenv()
llm = ChatOpenAI(temperature=0, model="gpt-4o")


def page_summerize(url: str, question: str):

    #    template = Template('${question},based on ${url}')
    simple_reader_tool = SimpleReaderTool()
    tools = [simple_reader_tool]
    agent = initialize_agent(
        tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True
    )
    result = agent.run(f'{question},based on {url}')
    return result



