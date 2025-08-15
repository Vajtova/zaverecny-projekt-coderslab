import React, { act, useState } from "react";
import logo from '../assets/logo.png';

import { getJidelnicek } from "../ai"; 

export default function Calculator() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("sedavá");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState(null);

  const [jidelnicek, setJidelnicek] = useState(null);

  const handleCalculate = async() => {
    if (!gender || !age || !height || !weight || !goal) {
      alert("Vyplňte všechna pole.");
      return;
    }

    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);

    let bmr =
      gender === "muž"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    const activityCoef = {
      sedavá: 1.2,
      mírná: 1.3,
      střední: 1.55,
      velmi: 1.725,
      extrém: 1.9,
    }[activity];

    let tdee = bmr * activityCoef;
    if (goal === "hubnutí") tdee *= 0.85;
    if (goal === "nabírání") tdee *= 1.15;

    const protein_g = w * 2;
    const protein_kcal = protein_g * 4;
    const fat_g = w * 1;
    const fat_kcal = fat_g * 9;
    const carbs_kcal = tdee - protein_kcal - fat_kcal;
    const carbs_g = carbs_kcal / 4;

    setResult({
      gender,
      age,
      height,
      weight,
      activity,
      goal,
      tdee: Math.round(tdee),
      protein_g: Math.round(protein_g),
      protein_kcal: Math.round(protein_kcal),
      fat_g: Math.round(fat_g),
      fat_kcal: Math.round(fat_kcal),
      carbs_g: Math.round(carbs_g),
      carbs_kcal: Math.round(carbs_kcal),
    });

    setJidelnicek(await getJidelnicek({
        pohlavi: gender,
        vek: age,
        vyska: height,
        vaha: weight,
        aktivita: activity,
        cil: goal,  
        kalorie: protein_kcal + fat_kcal + carbs_kcal,
        bilkoviny: protein_g,
        sacharidy: carbs_g,
        tuky: fat_g,
    }));
  };

  const handleReset = () => {
    setGender("");
    setAge("");
    setHeight("");
    setWeight("");
    setActivity("sedavá");
    setGoal("");
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-base-200">
      {/* Hlavička */}
      <header className="w-full flex items-center justify-center gap-4 px-8 py-4 bg-base-100 shadow">
        <img src={logo} alt="Logo" className="h-20 w-auto" />
        <h1 className="text-xl font-light">
          Kalkulačka pro výpočet kalorického příjmu
        </h1>
      </header>

      {/* Formulář */}
      
        
        <main className="flex flex-col items-center w-full max-w-xl p-4 font-light">


        <div className="text-center my-6 text-xl font-semibold">
          Jdu na to 🧮🥗
        </div>

        <div className="card w-full bg-base-100 shadow p-6">
          {/* Pohlaví */}
          <div className="flex justify-around mb-4">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">žena</span>
              <input
                type="radio"
                name="gender"
                className="radio"
                value="žena"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text mr-2">muž</span>
              <input
                type="radio"
                name="gender"
                className="radio"
                value="muž"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
          </div>

          {/* Věk, výška, váha */}
          <div className="form-control mb-2 font-light">
            <label className="label">Věk:</label>
            <input
              type="number"
              className="input input-bordered ml-2 w-32"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form-control mb-2">
            <label className="label">Výška (cm):</label>
            <input
              type="number"
              className="input input-bordered ml-2 w-32"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="form-control mb-2">
            <label className="label">Váha (kg):</label>
            <input
              type="number"
              className="input input-bordered ml-2 w-32"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          {/* Aktivita */}
          <div className="form-control mb-2">
          <label className="label">Aktivita:</label>
          <select
  className="select select-bordered font-light ml-2 w-full"
  value={activity}
  onChange={(e) => setActivity(e.target.value)}
>
  <option value="sedavá">sedavá – žádné nebo minimální cvičení</option>
  <option value="mírná">mírná – lehká aktivita 1–3× týdně</option>
  <option value="střední">střední – cvičení 3–5× týdně</option>
  <option value="velmi">velmi aktivní – intenzivní trénink 6–7× týdně</option>
  <option value="extrém">extrémně aktivní – fyzicky náročná práce / dvoufázový trénink</option>
</select>
          </div>


          {/* Cíl */}
          <div className="flex justify-around mb-4">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">hubnutí</span>
              <input
                type="radio"
                name="goal"
                className="radio"
                value="hubnutí"
                onChange={(e) => setGoal(e.target.value)}
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text mr-2">udržování</span>
              <input
                type="radio"
                name="goal"
                className="radio"
                value="udržování"
                onChange={(e) => setGoal(e.target.value)}
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text mr-2">nabírání</span>
              <input
                type="radio"
                name="goal"
                className="radio"
                value="nabírání"
                onChange={(e) => setGoal(e.target.value)}
              />
            </label>
          </div>

          {/* Tlačítko výpočtu */}
          <button
            type="button"
            className="btn btn-primary w-full"
            onClick={handleCalculate}
          >
            SPOČÍTAT
          </button>
        </div>

        {/* Výsledky */}
        {result && (
          <>
            <div className="mt-6 card bg-base-100 shadow p-6 w-full">
              <h2 className="text-lg font-semibold mb-2">📊 Tvoje výsledky:</h2>
              <p className="mb-2">
                [ pro: {result.gender} | {result.age} let | {result.height} cm |{" "}
                {result.weight} kg | aktivita: {result.activity} | cíl:{" "}
                {result.goal} ]
              </p>
              <p className="mb-4 font-semibold">
                Doporučený denní příjem:{" "}
                <span className="text-primary">{result.tdee}</span> kcal
              </p>
              <div>
                <p>🍗 Bílkoviny: {result.protein_g} g ({result.protein_kcal} kcal)</p>
                <p>🥑 Tuky: {result.fat_g} g ({result.fat_kcal} kcal)</p>
                <p>🍚 Sacharidy: {result.carbs_g} g ({result.carbs_kcal} kcal)</p>
              </div>
            </div>

            {/* Jídelníček */}
            {jidelnicek === null ? (
              <p className="mt-4 text-center text-base-content">Načítám jídelníček...</p>
            ) : (
              <div className="mt-6 card bg-base-100 shadow p-6 w-full">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  🥗 Jídelníček na den
                </h3>

                {/* Snídaně */}
                <div className="mb-4 border-b border-base-300 pb-4">
                  <h4 className="text-md font-semibold mb-1">🍳 Snídaně</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    Kalorie: <span className="text-primary font-medium">{jidelnicek.snidane.kalorie}</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {jidelnicek.snidane.jidla.map((jidlo, index) => (
                      <li key={index} className="text-sm">
                        <strong>{jidlo.nazev}</strong> – {jidlo.ziviny}{" "}
                        <span className="italic text-gray-500">({jidlo.popis})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dopolední svačina */}
                <div className="mb-4 border-b border-base-300 pb-4">
                  <h4 className="text-md font-semibold mb-1">🍓 Dopolední svačina</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    Kalorie: <span className="text-primary font-medium">{jidelnicek.svacina.kalorie}</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {jidelnicek.svacina.jidla.map((jidlo, index) => (
                      <li key={index} className="text-sm">
                        <strong>{jidlo.nazev}</strong> – {jidlo.ziviny}{" "}
                        <span className="italic text-gray-500">({jidlo.popis})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Oběd */}
                <div className="mb-4 border-b border-base-300 pb-4">
                  <h4 className="text-md font-semibold mb-1">🥗 Oběd</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    Kalorie: <span className="text-primary font-medium">{jidelnicek.obed.kalorie}</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {jidelnicek.obed.jidla.map((jidlo, index) => (
                      <li key={index} className="text-sm">
                        <strong>{jidlo.nazev}</strong> – {jidlo.ziviny}{" "}
                        <span className="italic text-gray-500">({jidlo.popis})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Odpolední svačina */}
                <div className="mb-4 border-b border-base-300 pb-4">
                  <h4 className="text-md font-semibold mb-1">🧀 Odpolední svačina</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    Kalorie: <span className="text-primary font-medium">{jidelnicek.svacina2.kalorie}</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {jidelnicek.svacina2.jidla.map((jidlo, index) => (
                      <li key={index} className="text-sm">
                        <strong>{jidlo.nazev}</strong> – {jidlo.ziviny}{" "}
                        <span className="italic text-gray-500">({jidlo.popis})</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Večeře */}
                <div className="mb-4 border-b border-base-300 pb-4">
                  <h4 className="text-md font-semibold mb-1">🍛 Večeře</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    Kalorie: <span className="text-primary font-medium">{jidelnicek.vecere.kalorie}</span>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    {jidelnicek.vecere.jidla.map((jidlo, index) => (
                      <li key={index} className="text-sm">
                        <strong>{jidlo.nazev}</strong> – {jidlo.ziviny}{" "}
                        <span className="italic text-gray-500">({jidlo.popis})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tlačítko resetu */}
            <button
              type="button"
              className="btn btn-warning w-full mt-4"
              onClick={handleReset}
            >
              Zadat nové údaje
            </button>
          </>
        )}
      </main>

      {/* Patička */}
      <footer className="w-full text-center py-4 text-sm text-gray-500">
        © 2025 - Veronika Vajtová ❤️
      </footer>
    </div>
  );
}


