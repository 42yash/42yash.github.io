<script lang="ts">
  interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }

  let messages = $state<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);

  let inputValue = $state('');
  let isTyping = $state(false);

  function sendMessage() {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    messages = [...messages, userMessage];
    inputValue = '';
    isTyping = true;

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 1,
        text: generateAIResponse(userMessage.text),
        sender: 'ai',
        timestamp: new Date()
      };
      messages = [...messages, aiMessage];
      isTyping = false;
    }, 1500);
  }

  function generateAIResponse(userText: string): string {
    const responses = [
      "That's an interesting question! Let me think about that...",
      "I understand what you're asking. Here's my perspective...",
      "Great point! Have you considered this angle?",
      "I'm here to help. Could you tell me more about that?",
      "Based on what you've said, I would suggest..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="chat-page">
  <div class="chat-container">
    <header class="chat-header">
      <h1>AI Assistant</h1>
      <p>Ask me anything!</p>
    </header>

    <div class="messages-container">
      {#each messages as message}
        <div class="message {message.sender}">
          <div class="message-bubble">
            {message.text}
          </div>
          <div class="message-time">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      {/each}

      {#if isTyping}
        <div class="message ai">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      {/if}
    </div>

    <div class="input-container">
      <input
        type="text"
        bind:value={inputValue}
        onkeydown={handleKeydown}
        placeholder="Type your message..."
        class="message-input"
      />
      <button onclick={sendMessage} class="send-button">
        Send
      </button>
    </div>
  </div>
</div>

<style>
  .chat-page {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    box-sizing: border-box;
  }

  :global([data-theme="dark"]) .chat-page {
    background: linear-gradient(135deg, #6B21A8 0%, #4C1D95 100%);
  }

  .chat-container {
    width: calc(100% - 1rem);
    max-width: 1400px;
    height: calc(100% - 1rem);
    background: white;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    box-shadow:
      0 2px 4px rgba(168, 85, 247, 0.06),
      0 8px 16px rgba(168, 85, 247, 0.08),
      0 16px 48px rgba(168, 85, 247, 0.12),
      inset 0 -2px 4px rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(168, 85, 247, 0.15);
    box-sizing: border-box;
  }

  :global([data-theme="dark"]) .chat-container {
    background: #1F2937;
    box-shadow:
      0 2px 4px rgba(196, 181, 253, 0.05),
      0 8px 16px rgba(196, 181, 253, 0.1),
      0 16px 48px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(196, 181, 253, 0.2);
  }

  .chat-header {
    padding: 2rem;
    text-align: center;
    border-bottom: 1px solid #E9D5FF;
    background: linear-gradient(180deg, #FAF5FF 0%, #FFFFFF 100%);
  }

  .chat-header h1 {
    font-size: 2rem;
    color: #6B21A8;
    margin: 0 0 0.5rem;
    font-weight: 700;
  }

  .chat-header p {
    color: #9333EA;
    margin: 0;
  }

  :global([data-theme="dark"]) .chat-header h1 {
    color: #C084FC;
  }

  :global([data-theme="dark"]) .chat-header p {
    color: #E9D5FF;
  }

  .messages-container {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .message {
    display: flex;
    flex-direction: column;
  }

  .message.user {
    align-items: flex-end;
  }

  .message.ai {
    align-items: flex-start;
  }

  .message-bubble {
    max-width: 70%;
    padding: 1rem 1.5rem;
    border-radius: 20px;
    word-wrap: break-word;
  }

  .user .message-bubble {
    background: linear-gradient(135deg, #A855F7, #9333EA);
    color: white;
    border-bottom-right-radius: 5px;
  }

  .ai .message-bubble {
    background: #F3E8FF;
    color: #581C87;
    border-bottom-left-radius: 5px;
    border: 1px solid #E9D5FF;
  }

  .message-time {
    font-size: 0.75rem;
    color: #9CA3AF;
    margin-top: 0.25rem;
    padding: 0 0.5rem;
  }

  .typing-indicator {
    display: flex;
    gap: 4px;
    padding: 1rem 1.5rem;
  }

  .typing-indicator span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #C084FC;
    animation: typing 1.4s infinite;
  }

  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.5;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }

  .input-container {
    padding: 1.5rem;
    border-top: 1px solid #E9D5FF;
    display: flex;
    gap: 1rem;
    background: linear-gradient(180deg, #FFFFFF 0%, #FAF5FF 100%);
  }

  .message-input {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid #E9D5FF;
    border-radius: 50px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
    background: white;
  }

  .message-input:focus {
    border-color: #C084FC;
    background: #FEFCFF;
  }

  .send-button {
    padding: 0.75rem 2rem;
    background: linear-gradient(135deg, #A855F7, #9333EA);
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .send-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(168, 85, 247, 0.25);
  }

  .send-button:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .chat-page {
      padding: 1rem;
    }

    .message-bubble {
      max-width: 85%;
    }
  }
</style>