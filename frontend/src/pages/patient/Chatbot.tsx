export default function Chatbot() {
  return (
    <div className="flex h-screen">
      <div className="bg-black/50 text-white w-[17vw] py-4 flex flex-col justify-between gap-5">
        <div className="flex justify-between py-2 items-center hover:bg-white/5 px-4 cursor-pointer">
          <p>New Chat</p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="ai ai-Edit"
            >
              <path d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621z" />
              <path d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3" />
            </svg>
          </p>
        </div>

        <div className=" grow flex flex-col gap-7">
          <div className="flex flex-col gap-2">
            <small className="text-gray-600 px-4">Previous 40 days</small>
            <div>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <small className="text-gray-600 px-4">April</small>
            <div>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
              <p className="px-2 py-2 hover:bg-white/5 rounded-sm cursor-pointer px-4">
                hello world
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center px-4">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-12">
              <span>SY</span>
            </div>
          </div>
          <p>Sausage Yam</p>
        </div>
      </div>
      <div className="grow flex justify-center">
        <div className="px-4 py-8 flex flex-col justify-between w-[65%] margin-x-auto">
          <div className="overflow-y-auto">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-bubble">
                It was said that you would, destroy the Sith, not join them.
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-bubble">
                It was you who would bring balance to the Force
              </div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <div className="chat-bubble">Not leave it in Darkness</div>
            </div>
          </div>
          <div className="flex justify-center">
            <textarea
              className="textarea w-full bg-black/25 text-white resize-none outline-0 focus:ring-0 focus:outline-0"
              placeholder="type here..."
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
