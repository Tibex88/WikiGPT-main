import wikipediaapi as wapi


def get_wikipedia_article(title):
    user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B179 Safari/7534.48.3'
    wiki_wiki = wapi.Wikipedia(user_agent = user_agent,language='en', extract_format= wapi.ExtractFormat.WIKI)
    page = wiki_wiki.page(title)

    if not page.exists():
        return None
    text = page.text
    return text

