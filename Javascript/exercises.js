const readline = require('readline');

function createInterface() {
  return readline.createInterface({ input: process.stdin, output: process.stdout });
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, (ans) => resolve(ans)));
}

function parseNumber(value, fallback = 0) {
  const n = Number(String(value).replace(/,/g, '.'));
  return Number.isFinite(n) ? n : fallback;
}

function format(n, digits = 2) {
  if (typeof n !== 'number' || !Number.isFinite(n)) return String(n);
  return Number(n.toFixed(digits));
}

async function ejercicio1(rl, demo) {
  console.log('\n1) Operaciones básicas con dos números');
  let a, b;
  if (demo) {
    a = 12; b = 5;
  } else {
    a = parseNumber(await ask(rl, 'Ingrese el primer número: '));
    b = parseNumber(await ask(rl, 'Ingrese el segundo número: '));
  }
  console.log(`Suma: ${a + b}`);
  console.log(`Resta: ${a - b}`);
  console.log(`Multiplicación: ${a * b}`);
  console.log(`División: ${format(a / b)}`);
  console.log(`Módulo: ${a % b}`);
  console.log(`Potencia: ${a ** b}`);
}

async function ejercicio2(rl, demo) {
  console.log('\n2) Áreas de figuras');
  if (demo) {
    const lado = 4, base = 5, altura = 3, radio = 2;
    console.log(`Cuadrado (lado=${lado}) área: ${lado * lado}`);
    console.log(`Rectángulo (base=${base}, altura=${altura}) área: ${base * altura}`);
    console.log(`Triángulo (base=${base}, altura=${altura}) área: ${format((base * altura) / 2)}`);
    console.log(`Círculo (radio=${radio}) área: ${format(Math.PI * radio * radio)}`);
    return;
  }
  const lado = parseNumber(await ask(rl, 'Cuadrado - ingrese lado: '));
  console.log(`Área cuadrado: ${lado * lado}`);
  const baseR = parseNumber(await ask(rl, 'Rectángulo - ingrese base: '));
  const altR = parseNumber(await ask(rl, 'Rectángulo - ingrese altura: '));
  console.log(`Área rectángulo: ${baseR * altR}`);
  const baseT = parseNumber(await ask(rl, 'Triángulo - ingrese base: '));
  const altT = parseNumber(await ask(rl, 'Triángulo - ingrese altura: '));
  console.log(`Área triángulo: ${format((baseT * altT) / 2)}`);
  const radio = parseNumber(await ask(rl, 'Círculo - ingrese radio: '));
  console.log(`Área círculo: ${format(Math.PI * radio * radio)}`);
}

function evaluarPromedio(prom) {
  const aprueba = prom >= 7;
  let clasif;
  if (prom === 10) clasif = 'Satisfactorio (beca)';
  else if (prom >= 8 && prom < 10) clasif = 'Muy buena';
  else if (prom >= 7 && prom < 8) clasif = 'Buena';
  else clasif = 'Regular';
  return { aprueba, clasif };
}

async function ejercicio3a5(rl, demo) {
  console.log('\n3-5) Promedio y condición del estudiante');
  let ingles, matematica, lengua;
  if (demo) {
    ingles = 8.5; matematica = 9.2; lengua = 7.8;
  } else {
    ingles = parseNumber(await ask(rl, 'Ingrese nota de Inglés: '));
    matematica = parseNumber(await ask(rl, 'Ingrese nota de Matemática: '));
    lengua = parseNumber(await ask(rl, 'Ingrese nota de Lengua: '));
  }
  const prom = format((ingles + matematica + lengua) / 3, 2);
  console.log(`Promedio: ${prom}`);
  const { aprueba, clasif } = evaluarPromedio(prom);
  console.log(aprueba ? 'Aprueba (>= 7)' : 'Reprueba (< 7)');
  console.log(`Clasificación: ${clasif} y ${aprueba ? 'aprueba' : 'reprueba'}`);
}

async function ejercicio6(rl, demo) {
  console.log('\n6) Área y perímetro de figuras (con hipotenusa si triángulo)');
  let figura;
  if (demo) {
    figura = 'triangulo';
  } else {
    figura = (await ask(rl, 'Elija figura (cuadrado/rectangulo/triangulo/circulo): ')).toLowerCase();
  }
  if (figura === 'cuadrado') {
    const lado = demo ? 5 : parseNumber(await ask(rl, 'Lado: '));
    console.log(`Área: ${lado * lado}`);
    console.log(`Perímetro: ${4 * lado}`);
  } else if (figura === 'rectangulo' || figura === 'rectángulo') {
    const base = demo ? 6 : parseNumber(await ask(rl, 'Base: '));
    const altura = demo ? 3 : parseNumber(await ask(rl, 'Altura: '));
    console.log(`Área: ${base * altura}`);
    console.log(`Perímetro: ${2 * (base + altura)}`);
  } else if (figura === 'triangulo' || figura === 'triángulo') {
    const base = demo ? 6 : parseNumber(await ask(rl, 'Base: '));
    const altura = demo ? 4 : parseNumber(await ask(rl, 'Altura: '));
    console.log(`Área: ${format((base * altura) / 2)}`);
    const a = demo ? 3 : parseNumber(await ask(rl, 'Lado a (cateto 1 si es rectángulo): '));
    const b = demo ? 4 : parseNumber(await ask(rl, 'Lado b (cateto 2 si es rectángulo): '));
    const c = demo ? 5 : parseNumber(await ask(rl, 'Lado c (hipotenusa si es rectángulo): '));
    console.log(`Perímetro: ${a + b + c}`);
    const h = format(Math.hypot(a, b));
    console.log(`Hipotenusa (asumiendo triángulo rectángulo con catetos a y b): ${h}`);
  } else if (figura === 'circulo' || figura === 'círculo') {
    const r = demo ? 2.5 : parseNumber(await ask(rl, 'Radio: '));
    console.log(`Área: ${format(Math.PI * r * r)}`);
    console.log(`Perímetro (circunferencia): ${format(2 * Math.PI * r)}`);
  } else {
    console.log('Figura no reconocida.');
  }
}

async function ejercicio7(rl, demo) {
  console.log('\n7) Tabla de multiplicar');
  const n = demo ? 6 : parseNumber(await ask(rl, 'Ingrese un número: '));
  for (let i = 1; i <= 12; i++) {
    console.log(`${n} x ${i} = ${n * i}`);
  }
}

async function ejercicio8() {
  console.log('\n8) Mostrar un arreglo en pantalla');
  const arr = ['A', 'B', 'C', 'D', 'E'];
  console.log(arr);
}

async function ejercicio9(rl, demo) {
  console.log('\n9) Funcion verificarPar');
  const n = demo ? 17 : parseNumber(await ask(rl, 'Ingrese un número: '));
  console.log(n % 2 === 0 ? 'Es par' : 'Es impar');
}

async function ejercicio10() {
  console.log('\n10) Arreglo de 5 frutas');
  const frutas = ['Manzana', 'Banana', 'Naranja', 'Pera', 'Uva'];
  frutas.forEach((f, i) => console.log(`${i + 1}. ${f}`));
}

async function ejercicio11() {
  console.log('\n11) Suma de 5 números');
  const nums = [3, 7, 2, 9, 4];
  const suma = nums.reduce((acc, v) => acc + v, 0);
  console.log(`Números: ${nums.join(', ')}`);
  console.log(`Suma total: ${suma}`);
}

async function ejercicio12(rl, demo) {
  console.log('\n12) Buscar estudiante en lista');
  const estudiantes = ['Ana', 'Luis', 'María', 'Carlos', 'Sofía'];
  const buscado = demo ? 'María' : await ask(rl, 'Ingrese un nombre a buscar: ');
  const esta = estudiantes.includes(buscado);
  console.log(`Lista: ${estudiantes.join(', ')}`);
  console.log(esta ? `${buscado} está en la lista` : `${buscado} no está en la lista`);
}

async function ejercicio13() {
  console.log('\n13) Mayor de un arreglo');
  const nums = [15, 2, 99, 34, 67, 12];
  const mayor = Math.max(...nums);
  console.log(`Números: ${nums.join(', ')}`);
  console.log(`Mayor: ${mayor}`);
}

async function ejercicio14() {
  console.log('\n14) Arreglo en orden inverso');
  const nums = [1, 2, 3, 4, 5, 6];
  console.log('Original:', nums);
  console.log('Inverso:', [...nums].reverse());
}

async function main() {
  const demo = process.argv.includes('--demo');
  const rl = createInterface();
  try {
    await ejercicio1(rl, demo);
    await ejercicio2(rl, demo);
    await ejercicio3a5(rl, demo);
    await ejercicio6(rl, demo);
    await ejercicio7(rl, demo);
    await ejercicio8();
    await ejercicio9(rl, demo);
    await ejercicio10();
    await ejercicio11();
    await ejercicio12(rl, demo);
    await ejercicio13();
    await ejercicio14();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main();
}
