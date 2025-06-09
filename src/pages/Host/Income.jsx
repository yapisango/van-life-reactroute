import React from "react"
import "../../assets/styles/index.css"

export default function Income() {
    const transactionsData = [
        { amount: 3900, date: "Aug", id: "1" },
        { amount: 1400, date: "Sep", id: "2" },
        { amount: 2900, date: "Oct", id: "3" },
        { amount: 2600, date: "Nov", id: "4" },
        { amount: 1500, date: "Dec", id: "5" },
        { amount: 600,  date: "Jan", id: "6" },
    ]

    const maxAmount = Math.max(...transactionsData.map(t => t.amount))

    return (
        <section className="host-income">
            <p className="subheading">Last <span>30 days</span></p>
            <h1 className="income-total">$2,260</h1>

            <div className="income-chart">
                <div className="y-axis">
                    {["$5k", "$4k", "$3k", "$2k", "$1k", "$0"].map(label => (
                        <div key={label} className="y-label">{label}</div>
                    ))}
                </div>

                <div className="bar-area">
                    {transactionsData.map((item, index) => (
                        <div className="bar-item" key={item.id}>
                            <div
                                className={`bar ${index === transactionsData.length - 1 ? "highlight" : ""}`}
                                style={{ height: `${(item.amount / maxAmount) * 100}%` }}
                            ></div>
                            <p className="bar-label">{item.date}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

