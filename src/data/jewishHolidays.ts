import { HebrewCalendar, HDate, Event as HebcalEvent, Location } from '@hebcal/core';
import { Evento } from './events';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

interface InfoJudia {
  nombre: string;
  resumen: string;
  imagen?: string;
}

const mapJewishHoliday = (desc: string, isChag: boolean): InfoJudia | null => {
  if (desc === 'Yom HaShoah') return { nombre: 'Iom HaShoa', resumen: 'Día de Conmemoración del Holocausto y del Heroísmo. Se recuerda a los seis millones de judíos asesinados por el régimen nazi y se honra la valentía de quienes resistieron, como en el Levantamiento del Gueto de Varsovia.', imagen: '/Iom HaShoa.png' };
  if (desc === 'Yom Hazikaron') return { nombre: 'Iom HaZikaron', resumen: 'Día del Recuerdo de los Caídos en los Conflictos de Israel y de las Víctimas del Terrorismo. Es una jornada de duelo nacional que precede a las celebraciones por la independencia.', imagen: '/Iom HaZikaron.png' };
  if (desc === "Yom HaAtzma'ut" || desc === "Yom Haatzmaut") return { nombre: 'Iom HaAtzmaut', resumen: 'Día de la Independencia del Estado de Israel. Conmemora la declaración de soberanía del estado en 1948, celebrando el retorno del pueblo judío a su patria ancestral.', imagen: '/Iom HaAtzmaut.png' };
  if (desc === 'Erev Pesach') return { nombre: 'Víspera de Pesaj', resumen: 'Comienzo de Pesaj al anochecer con la celebración del Seder, la cena ritual donde se relata la salida de Egipto.', imagen: '/Pesaj.png' };
  if (desc.startsWith('Pesach') && isChag) return { nombre: `Pesaj (${desc.split(' ')[1] || 'Día No Laborable'})`, resumen: 'Festividad de la Libertad (Zman Jerutenu). Conmemora la liberación del pueblo judío de la esclavitud en Egipto. Se acostumbra comer Matzá (pan ázimo) y evitar alimentos leudados.', imagen: '/Pesaj.png' };
  if (desc === 'Erev Rosh Hashana') return { nombre: 'Víspera de Rosh Hashaná', resumen: 'Comienzo del Año Nuevo Judío al anochecer, iniciando un período de reflexión y balance espiritual.', imagen: '/Rosh Hashaná.png' };
  if (desc.startsWith('Rosh Hashana') && isChag) return { nombre: `Rosh Hashaná (${desc.includes('II') ? 'Día 2' : 'Día 1'})`, resumen: 'Año Nuevo Judío (literalmente "Cabeza del Año"). Es un tiempo de introspección, oración y el toque del Shofar (cuerno de carnero), que llama al despertar espiritual.', imagen: '/Rosh Hashaná.png' };
  if (desc === 'Erev Yom Kippur') return { nombre: 'Víspera de Iom Kipur', resumen: 'Comienzo de Iom Kipur al anochecer con el rezo de Kol Nidrei. Se inicia el ayuno de 25 horas para la expiación de los pecados.', imagen: '/Iom Kipur.png' };
  if (desc === 'Yom Kippur') return { nombre: 'Iom Kipur', resumen: 'Día del Perdón. Es la festividad más sagrada del calendario judío, dedicada al ayuno, la oración y la reconciliación con el prójimo y con Dios.', imagen: '/Iom Kipur.png' };
  if (desc === 'Erev Sukkot') return { nombre: 'Víspera de Sucot', resumen: 'Comienzo de Sucot al anochecer. Se inicia la construcción y permanencia en las cabañas temporales.', imagen: '/Sucot.png' };
  if (desc.startsWith('Sukkot') && isChag) return { nombre: `Sucot (${desc.split(' ')[1] || 'Día No Laborable'})`, resumen: 'Fiesta de las Cabañas o de los Tabernáculos. Conmemora la protección divina durante los 40 años que el pueblo judío vagó por el desierto. También es una fiesta de agradecimiento por la cosecha.', imagen: '/Sucot.png' };
  if (desc === 'Shmini Atzeret') return { nombre: 'Sheminí Atzeret', resumen: 'Festividad que concluye Sucot. "El octavo día de asamblea", considerado una festividad independiente dedicada a la alegría y la oración por la lluvia.', imagen: '/Sheminí Atzeret.png' };
  if (desc === 'Simchat Torah') return { nombre: 'Simjat Torá', resumen: 'Alegría de la Ley. Se celebra la finalización del ciclo anual de lectura de la Torá y su inmediato reinicio, con bailes y cantos con los rollos sagrados.', imagen: '/Simjat Tora.png' };
  if (desc === 'Erev Shavuot') return { nombre: 'Víspera de Shavuot', resumen: 'Comienzo de Shavuot al anochecer, celebrando la entrega de la Torá.', imagen: '/Shavuot.png' };
  if (desc.startsWith('Shavuot') && isChag) return { nombre: `Shavuot (${desc.split(' ')[1] || 'Día No Laborable'})`, resumen: 'Festividad de las Semanas. Conmemora la entrega de la Torá en el Monte Sinaí y celebra la cosecha de los primeros frutos (Bikurim).', imagen: '/Shavuot.png' };
  if (desc === 'Erev Purim') return { nombre: 'Víspera de Purim', resumen: 'Comienzo de Purim al anochecer con la lectura de la Meguilá de Ester.', imagen: '/Purim.png' };
  if (desc === 'Purim') return { nombre: 'Purim', resumen: 'Festividad que conmemora la salvación del pueblo judío en la antigua Persia frente al plan de aniquilación de Amán. Se celebra con disfraces, regalos y ayuda a los necesitados.', imagen: '/Purim.png' };
  if (desc.startsWith('Chanukah: 1 Candle')) return { nombre: 'Jánuca', resumen: 'Fiesta de las Luminarias. Conmemora la reinauguración del Templo de Jerusalén y el milagro del aceite que duró ocho días tras la victoria de los Macabeos.', imagen: '/Januca.png' };
  if (desc === 'Tu BiShvat') return { nombre: 'Tu Bishvat', resumen: 'Año Nuevo de los Árboles. Jornada dedicada a la conciencia ecológica, el aprecio por la naturaleza y la plantación de árboles en Israel.', imagen: '/Tu Bishvat.png' };
  return null;
}

export function getJewishHolidaysForYear(year: number): Evento[] {
  const options = {
    year: year,
    isHebrewYear: false,
    il: false, // Diaspora 
  };
  const events = HebrewCalendar.calendar(options);
  
  const holidays: Evento[] = [];
  
  events.forEach((ev: HebcalEvent) => {
    const desc = ev.getDesc();
    const isChag = (ev.getFlags() & 1) !== 0; // 1 evaluates to CHAG in Hebcal flags
    const info = mapJewishHoliday(desc, isChag);
    
    if (info) {
      const gDate = ev.getDate().greg();
      holidays.push({
        id: `jewish-${desc.replace(/[^a-zA-Z0-9]/g, '-')}`,
        nombre: info.nombre,
        resumen: info.resumen,
        mes: MESES[gDate.getMonth()],
        dia: gDate.getDate(),
        tipo: 'Efemérides religiosas',
        estado: 'publicado',
        origen: 'Hebcal',
        tematicas: 'Festividades y conmemoraciones',
        areas: 'Estudios Judaicos',
        imagenUrl: info.imagen || '',
        iconKey: '',
        enlace: '',
        isJewish: true,
      });
    }
  });

  return holidays;
}

