import React from "react";
import "./HomeAbout.css";


export default function HomeAbout() {
    return (
        <ul>
            <li aria-label="What is VaxPaxx">
                A crowd sourced community to make sure no COVID-19 Vaccine goes to waste.
            </li>
            <li aria-label="How VaxPaxx works:">
                <ol>
                    <li>One hour before closing the pharmacist can input
                        the number of remaining doses that will expire that day and will be thrown out if not
                        used immediately</li>
                    <li>30 minutes before local vaccination location
                        closing, a patient can check VaxPaxx for any left over doses</li>
                    <li>One hour after local vaccination location
                        closing time the dose count zeros out</li>
                </ol>
            </li>
            <li aria-label="VaxxPaxx honor system rules:">
                <ol>
                    <li>Only select pharmacist if you are the one administering the vaccine</li>
                    <li>Respect the priority guidelines in your location</li>
                    <li>Respect the pharmacist</li>
                    <li>First come first serve</li>
                </ol>
            </li>
        </ul>
    )
}
