import os
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

# Replace with your API key
# os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
model = ChatOpenAI(model="gpt-3.5-turbo")
# os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
model2 = ChatOpenAI(model="gpt-3.5-turbo")

# messages = [
#     SystemMessage(content="Top 10 most popular programming languages in 2021"),
#     # HumanMessage(content="hi!"),
# ]


prompt_template = ChatPromptTemplate.from_messages(
    [("system",
      "Translate the following into {language}:"), ("user", "{text}")]
)

parser = StrOutputParser()


chain = prompt_template | model | parser

response = chain.invoke({
    "language": "Telugu",
    "text": "Hello, how are you raghu?"
})

print(response)
