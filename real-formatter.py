import textwrap

WRAP_VARIABLE = 80
TAB_AS_CHARS = "   "

text = """
dirk-vandecavey_GCO2: Suggest possible scenarios to realize the solution to the problem stated in the requirements document. 

GitHub Copilot: To realize the solution to the problem stated in the requirements document, you can consider the following scenarios:

Each of these scenarios has its own advantages and trade-offs. Choose the one that best fits your requirements and development environment.

dirk-vandecavey_GCO2: Provide pros and cons for each approach. 
- minimal coupling ( no impact on existing websites is preferred)
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
    lines = text.strip().split("\n")
    chat_messages = []
    current_message = []
    current_speaker = ""

    for line in lines:
        line = line.rstrip()
        if line.startswith("dirk-vandecavey_GCO2:") or line.startswith("GitHub Copilot:"):
            if current_message:
                # Wrap text but preserve Markdown formatting
                wrapped_message = "\n".join(
                    textwrap.fill(para, WRAP_VARIABLE) if not para.startswith("-") and not para.startswith("#") else para
                    for para in "\n".join(current_message).split("\n")
                )
                # Apply TAB_AS_CHARS at the final stage
                indented_message = "\n".join(TAB_AS_CHARS + line for line in wrapped_message.split("\n"))
                chat_messages.append(f"**{current_speaker}**:\n\n{indented_message}")

            current_speaker, new_message = line.split(":", 1)
            current_message = [new_message.strip()]
        else:
            current_message.append(line)

    # Process last message if it exists
    if current_message:
        wrapped_message = "\n".join(
            textwrap.fill(para, WRAP_VARIABLE) if not para.startswith("-") and not para.startswith("#") else para
            for para in "\n".join(current_message).split("\n")
        )
        indented_message = "\n".join(TAB_AS_CHARS + line for line in wrapped_message.split("\n"))
        chat_messages.append(f"**{current_speaker}**:\n\n{indented_message}")

    return chat_messages

formatted_chat = format_chat(text)

with open("OUTPUT.md", "w", encoding="utf-8") as file:
    for message in formatted_chat:
        file.write(f"{message}\n\n")

print("Formatted chat saved to OUTPUT.md")
