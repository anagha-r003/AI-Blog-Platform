import { Link } from "react-router-dom";



export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F14] text-[#F1ECE2]">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <br />
      <h3 className="text-2xl font-semibold">AI generation</h3>
      <Link to="/ai-generation">AI Generation link</Link>
      
    </div>
  );
}
