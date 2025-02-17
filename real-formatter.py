import textwrap

WRAP_VARIABLE = 80

text = """
dirk-vandecavey_GCO2: Suggest possible scenarios to realize the solution to the problem stated in the requirements document. 

GitHub Copilot: To realize the solution to the problem stated in the requirements document, you can consider the following scenarios:

Each of these scenarios has its own advantages and trade-offs. Choose the one that best fits your requirements and development environment.

dirk-vandecavey_GCO2: Provide pros and cons for each approach. 
- minimal coupling ( no impact on existying websites is preferred)
- integration of specific common features in the portal should be possible

GitHub Copilot: ### Scenario 1: Single Page Application (SPA) with JavaScript Framework

**Pros:**
- **Rich User Experience**: Provides a dynamic and responsive user interface.
- **Component Reusability**: Easy to reuse components across the portal.

**Cons:**
- **Initial Load Time**: May have a longer initial load time due to the size of the JavaScript bundle.
- **SEO Challenges**: Requires additional configuration for SEO optimization.

### Recommendation
Given the requirement for minimal coupling and the ability to integrate common features, 

**Scenario 5: Micro Frontends** is a strong candidate. It allows for independent development and deployment of each website, minimizing the impact on existing websites. Additionally, it provides the flexibility to integrate common features at the portal level.

"""

def format_chat(text):
    lines = text.strip().split('\n')
    chat_messages = []
    current_message = ""
    current_speaker = ""
    for line in lines:
        line = line.rstrip()
        if line.startswith("dirk-vandecavey_GCO2:") or line.startswith("GitHub Copilot:"):
            if current_message:
                chat_messages.append(f'**{current_speaker}**:\n\n{current_message.strip()}')
            current_speaker, current_message = line.split(":", 1)
            current_message = current_message.strip()
        else:
            current_message += "\n" + line
    if current_message:
        chat_messages.append(f'**{current_speaker}**:\n\n{current_message.strip()}')
    return chat_messages

formatted_chat = format_chat(text)

with open("OUTPUT.md", "w") as file:
    for message in formatted_chat:
        file.write(f'{message}\n\n')

