export default function Home() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-extrabold mb-2">Welcome to Trustmark</h1>
        <p className="text-lg mb-1">Leave proof with a simple wallet signature.</p>
        <p className="text-base text-gray-700">All records are permanently stored on blockchain.</p>
      </section>

      {/* 메인 설명 + 이미지 우측 배치 */}
      <section className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">🧐 Why go PRO?</h2>
          <ul className="list-disc list-inside text-base space-y-1">
            <li><span className="font-semibold">Unlimited</span> uploads, sharing, and PDF downloads</li>
            <li>Permanently stored, no ads</li>
            <li>Upgrade/cancel anytime instantly</li>
          </ul>
        </div>
        <div className="flex-shrink-0 w-full md:w-72">
          <img
            src="/main-visual.png"
            alt="Trustmark Visual"
            className="w-full h-auto rounded-xl shadow"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <h3 className="text-lg font-bold mb-2">FREE</h3>
          <p className="text-base text-gray-700">Limited uploads/sharing<br />Upload & PDF restricted</p>
        </div>
        <div className="bg-black p-5 rounded-xl shadow text-center text-white">
          <h3 className="text-lg font-bold mb-2">PRO <span className="text-sm">($9.99/mo)</span></h3>
          <p className="text-base">Unlimited uploads, sharing, PDF<br />1-click payment, cancel anytime</p>
          <a
            href="/upgrade"
            className="mt-3 inline-block bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-200 transition"
          >
            Upgrade to PRO now
          </a>
        </div>
      </section>
    </div>
  )
}
