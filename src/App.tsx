import { KeyboardEvent, useState } from "react";
import CompanyLogo from "./logo.jpg";

function App() {
  return (
    <main className="pt-8 pb-16 px-16 space-y-8 md:space-y-16">
      <TopBar />
      <Heading />
      <SalesCards />
      <ChatWidget />
    </main>
  );
}

function TopBar() {
  return (
    <div className="flex flex-col gap-4 md:gap-0 md:justify-between items-center md:flex-row">
      <Logo />
      <Menu />
    </div>
  );
}

function Logo() {
  return <img src={CompanyLogo} alt="Company Logo" width={160} height={160} />;
}

function Menu() {
  return (
    <>
      <nav>
        <ul className="hidden font-semibold md:flex md:gap-8 md:items-center">
          <li className="hover:border-black border-b-2 border-transparent cursor-pointer transition-all ease-in duration-300">
            Home
          </li>
          <li className="hover:border-black border-b-2 border-transparent cursor-pointer transition-all ease-in duration-300">
            What We Do
          </li>
          <li className="hover:border-black border-b-2 border-transparent cursor-pointer transition-all ease-in duration-300">
            Features
          </li>
          <li className="hover:border-black border-b-2 border-transparent cursor-pointer transition-all ease-in duration-300">
            Contact Sales
          </li>
          <li className="hover:bg-yellow-300 cursor-pointer bg-yellow-400 p-2 font-bold rounded-md transition-all ease-in duration-150">
            Log in / Sign Up
          </li>
        </ul>
        <ul className="md:hidden font-semibold grid grid-cols-2 items-center gap-2">
          <li className="border-b-2 border-transparent">Home</li>
          <li className="border-b-2 border-transparent">What We Do</li>
          <li className="border-b-2 border-transparent">Features</li>
          <li className="border-b-2 border-transparent">Contact Sales</li>
          <li className="bg-yellow-400 p-2 font-bold rounded-md col-span-2 text-center">
            Log in / Sign Up
          </li>
        </ul>
      </nav>
    </>
  );
}

function Heading() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold">Choose the Perfect Plan for You</h1>
      <p>
        Get started with a 14-day free trial (no credit card required) and then
        pick a plan.
      </p>
    </div>
  );
}

const salesCardData = [
  {
    id: "1",
    title: "Bootstrap",
    subtitle: "Best for Individuals",
    pricePerMonth: "$19",
    marketingPoints: [
      "5 Social Profiles",
      "1 User per Workspace",
      "10,000 Posts per Account",
    ],
    callToAction: "Start Free Trial",
    popular: false,
  },
  {
    id: "2",
    title: "Accelerate",
    subtitle: "Best for Startups",
    pricePerMonth: "$39",
    marketingPoints: [
      "10 Social Profiles",
      "3 Users per Workspace",
      "250,000 Posts per Account",
    ],
    callToAction: "Start Free Trial",
    popular: true,
  },
  {
    id: "3",
    title: "Pro",
    subtitle: "Best for Agencies",
    pricePerMonth: "$79",
    marketingPoints: [
      "25 Social Profiles",
      "5 Users per Workspace",
      "Unlimited Posts per Account",
    ],
    callToAction: "Start Free Trial",
    popular: false,
  },
];

function SalesCards() {
  return (
    <div className="flex flex-col gap-16 md:flex-row md:gap-8 md:justify-center">
      {salesCardData.map((data) => {
        return <SalesCard key={data.id} {...data} />;
      })}
    </div>
  );
}

type SalesCardProps = {
  title: string;
  subtitle: string;
  pricePerMonth: string;
  marketingPoints: Array<string>;
  callToAction: string;
  popular: boolean;
};

function SalesCard({
  title,
  subtitle,
  pricePerMonth,
  marketingPoints,
  callToAction,
  popular,
}: SalesCardProps) {
  return (
    <div
      className={`rounded-lg border-2 border-black space-y-4 text-center bg-white ${
        popular && "scale-110"
      }`}
    >
      <section className="bg-yellow-400 p-4 rounded-t-lg relative">
        <h2 className="text-2xl font-bold">{title}</h2>
        <h3 className="text-lg font-semibold">{subtitle}</h3>
        {popular && (
          <div className="absolute -top-4 -right-4 p-2 rotate-12 bg-black text-white rounded-md text-sm">
            Most Popular
          </div>
        )}
      </section>
      <section className="px-4">
        <p className="font-bold text-4xl">{pricePerMonth}</p>
        <span className="text-lg">per month</span>
      </section>
      <section className="px-4">
        <ul>
          {marketingPoints.map((copy, index) => {
            return (
              <li key={index} className="font-semibold">
                &#x2713; {copy}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="pb-4 px-4">
        <button
          type="button"
          className="border-2 border-black px-8 py-2 font-semibold rounded-md bg-yellow-400 hover:bg-yellow-300 transition-all ease-in duration-150"
        >
          {callToAction}
        </button>
      </section>
    </div>
  );
}

function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<string>>([]);

  function onSubmitChatMessage(event: KeyboardEvent) {
    if (event.key != "Enter") return;
    if (!currentMessage.trim()) return;

    const newMessage = `(${new Date().toLocaleTimeString()}) You: ${currentMessage.trim()}`;
    setChatMessages((prev) => [...prev, newMessage]);
    setCurrentMessage("");
  }

  return (
    <div className="w-fit fixed bottom-16 right-4 md:right-16 z-50">
      {!chatOpen && (
        <span
          className="text-md md:text-xl bg-yellow-400 py-2 px-4 rounded-full cursor-pointer font-semibold"
          onClick={() => setChatOpen(true)}
        >
          Chat with us
        </span>
      )}
      {chatOpen && (
        <div className="border-2 border-black p-4 relative flex flex-col gap-2 md:w-96 break-words bg-white">
          <div
            onClick={() => setChatOpen(false)}
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-black text-white rounded-full py-1 px-2 text-sm grid content-center cursor-pointer"
          >
            x
          </div>
          <span className="font-bold">How can we help you?</span>
          {chatMessages.map((msg, i) => {
            return <span key={i}>{msg}</span>;
          })}
          <input
            className="border-b-2 border-gray-500 pb-1"
            type="text"
            placeholder="Type a message"
            value={currentMessage}
            onChange={(event) => setCurrentMessage(event.target.value)}
            onKeyUp={onSubmitChatMessage}
          />
        </div>
      )}
    </div>
  );
}

export default App;
