
B_INST, E_INST = "[INST]", "[/INST]"
B_SYS, E_SYS = "<<SYS>>\n", "\n<</SYS>>\n\n"

DEFAULT_SYSTEM_PROMPT = """
  You will be given texts related to a certain topic. Write a summary response that answers the question based on what is discussed in the texts.
  Do not mention anything outside of what is provided. Don't answer anything outside the context you are provided.
  If there isn't enough context, simply reply "This topic was not discussed previously"
  """

SYSTEM_PROMPT = B_SYS + DEFAULT_SYSTEM_PROMPT + E_SYS

def get_prompt(instruction):
    prompt_template =  B_INST + SYSTEM_PROMPT + instruction + E_INST
    return prompt_template

def format_prompt(query, context):
    return '''
    ### Texts:
    {context}

    ### Question:
    {query}
    '''.format(context=context, query=query)

def format_response(response):
    return response.split("[/INST]")[1].replace("</s>","").strip()

