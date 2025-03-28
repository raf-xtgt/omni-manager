export default function Chat() {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Chat</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold">Telegram</h2>
            <p>Connect your Telegram account</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold">WhatsApp</h2>
            <p>Connect your WhatsApp account</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold">Instagram</h2>
            <p>Connect your Instagram account</p>
          </div>
        </div>
      </div>
    );
  }