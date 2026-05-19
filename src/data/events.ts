import Papa from 'papaparse';

export const csvData = `"id","nombre","resumen","mes","dia","tipo","estado","origen","tematicas","areas","imagenUrl","iconKey","enlace"
"ACT-0002","Día Nacional de la Memoria por la Verdad y la Justicia","Esta fecha invita a reflexionar sobre la última dictadura cívico-militar en Argentina, promoviendo la memoria colectiva, la valoración de la democracia y la defensa irrenunciable de los derechos humanos.","Marzo","24","Efemérides nacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://campus.ort.edu.ar/democracia"
"ACT-0003","Día Internacional de Conmemoración en Memoria de las Víctimas del Holocausto","Fecha designada para recordar a las víctimas del Holocausto. Constituye un momento pedagógico fundamental para educar contra el antisemitismo, el racismo y toda forma de intolerancia que pueda conducir a la violencia.","Enero","27","Efemérides internacionales","publicado","Interna","Festividades y conmemoraciones","Estudios Judaicos; Ciencias Sociales","https://cdn.pixabay.com/photo/2014/07/26/15/25/birkenau-402324_1280.jpg","","https://campus.ort.edu.ar/secundaria/almagro/cienciassociales/historiaoral"
"ACT-0032","Día Mundial de los Humedales","Jornada orientada a concientizar sobre el valor vital de los humedales para nuestro planeta. Invita a estudiar la biodiversidad y comprender la importancia de estos ecosistemas en la mitigación del cambio climático.","Febrero","2","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","https://images.pexels.com/photos/3124842/pexels-photo-3124842.jpeg","","https://campus.ort.edu.ar/cambio"
"ACT-0034","Día Mundial de la Radio","Celebra la radio como medio de comunicación esencial. Desde una perspectiva pedagógica, permite explorar el lenguaje sonoro, la historia de las telecomunicaciones y la importancia de la diversidad de voces.","Febrero","13","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Sociales","https://images.pexels.com/photos/3199028/pexels-photo-3199028.jpeg","","https://campus.ort.edu.ar/articulo/1866384"
"ACT-0035","Nacimiento de Domingo Faustino Sarmiento","Conmemora el natalicio de una figura clave en la conformación del sistema educativo argentino. Propicia el debate histórico sobre la educación pública y los modelos de país en el siglo XIX.","Febrero","15","Efemérides nacionales","publicado","Interna","Fechas patrias","Ciencias Sociales","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzM3NjOgd0TZ2wtz17SNwGLJCxY0v9mW6WYw&s","",""
"ACT-0036","Día Mundial de la Justicia Social","Un día para reflexionar sobre la igualdad de oportunidades. Promueve el análisis de problemáticas como la pobreza, la inclusión, el trabajo no registrado y la importancia de construir sociedades más equitativas.","Febrero","20","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg","","https://editorial.ort.edu.ar/servicio/treeview/825978"
"ACT-0037","Nacimiento del General Don José de San Martín","Día para recordar y analizar la vida y el legado del Libertador. Constituye una oportunidad para abordar los procesos de independencia en América Latina y los valores de emancipación y soberanía.","Febrero","25","Efemérides nacionales","publicado","Interna","Fechas patrias","Ciencias Sociales","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3PK1a-m5kC_hdvNk3q5PvtXUZMeDsZmogUw&s","","https://campus.ort.edu.ar/actos/sanmartin"
"ACT-0065","Día de la Cero Discriminación","Jornada que busca promover la igualdad y el respeto por la diversidad. En el ámbito educativo, impulsa la reflexión en torno a la convivencia, los discursos de odio y la construcción de ciudadanía plural.","Marzo","1","Efemérides internacionales","publicado","Interna","Derechos humanos; ESI","Ciencias Sociales","https://images.pexels.com/photos/7929441/pexels-photo-7929441.jpeg","","https://campus.ort.edu.ar/ciudadaniadigital"
"ACT-0070","Día del Campo","Invita a explorar la importancia de la agricultura y la vida rural. Es un momento propicio para estudiar el origen de los alimentos, los procesos productivos y diferenciar entre la agricultura tradicional y la orgánica.","Marzo","7","Efemérides nacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","https://images.pexels.com/photos/1227513/pexels-photo-1227513.jpeg","","https://editorial.ort.edu.ar/servicio/treeview/1446170"
"ACT-0072","Día Internacional de la Mujer","Día de reivindicación de los derechos de las mujeres. Permite abordar históricamente las desigualdades de género, visibilizar el rol de las mujeres en la sociedad y promover activamente la igualdad y la ESI.","Marzo","8","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad; ESI","Ciencias Sociales","https://images.pexels.com/photos/3747257/pexels-photo-3747257.jpeg","","https://campus.ort.edu.ar/ciudadaniadigital"
"ACT-0075","Día Mundial de los Derechos de las y los Consumidores","Espacio para educar en la ciudadanía responsable y el consumo crítico. Fomenta el conocimiento de leyes, garantías y derechos fundamentales al momento de adquirir bienes y servicios.","Marzo","15","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/1189497#top"
"ACT-0076","Día Internacional para la Eliminación de la Discriminación Racial","Llama a erradicar toda distinción, exclusión o restricción basada en motivos de raza o color. Es fundamental para trabajar la tolerancia, la empatía y los derechos humanos en el aula.","Marzo","21","Efemérides internacionales","publicado","Interna","Derechos humanos; ESI","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/825922"
"ACT-0078","Día Mundial de la Poesía","Rinde homenaje a la expresión poética como pilar de la cultura humana. Invita a explorar el género lírico, fomentar la creatividad y utilizar la lectura y escritura como medios de expresión identitaria.","Marzo","21","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Lengua y literatura","","","https://editorial.ort.edu.ar/servicio/treeview/%20827621"
"ACT-0080","Día Internacional de los Bosques","Enfatiza el rol ecosistémico de los bosques para la supervivencia del planeta. Pedagógicamente, impulsa el estudio de la conservación, la biodiversidad y las problemáticas de la deforestación.","Marzo","21","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://campus.ort.edu.ar/cambio/servicio/treeview/1972261#top"
"ACT-0083","Día Mundial del Agua","Resalta la importancia del agua como recurso finito y esencial para la vida. Permite educar sobre su cuidado ecológico, la composición química y el acceso al agua potable como derecho humano.","Marzo","22","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://editorial.ort.edu.ar/servicio/treeview/1153060"
"ACT-0091","Día Internacional del Derecho a la Verdad","Rinde tributo a las víctimas de violaciones graves a los derechos humanos y promueve la importancia del derecho a conocer la verdad y la justicia en los procesos de memoria histórica.","Marzo","24","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","",""
"ACT-0094","Día Mundial del Teatro","Celebra las artes escénicas como motor de expresión cultural. Fomenta dinámicas de creatividad, expresión corporal, empatía y trabajo cooperativo a través de la representación teatral.","Marzo","27","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Arte","","","https://campus.ort.edu.ar/arte"
"ACT-0096","Día Nacional del Agua","Concientiza a nivel nacional sobre el uso racional de los recursos hídricos en el país. Sirve para estudiar la geografía local, las cuencas hidrográficas y los desafíos ambientales propios.","Marzo","31","Efemérides nacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg","","https://editorial.ort.edu.ar/links/1158194/categoria/122587/1"
"ACT-0100","Día de la Revolución de Mayo de 1810","Día clave en la historia argentina que conmemora la formación del Primer Gobierno Patrio. Propone analizar críticamente la ruptura de los lazos coloniales y el protagonismo social en dicho proceso.","Mayo","25","Efemérides nacionales","publicado","Interna","Fechas patrias","Ciencias Sociales","https://images.pexels.com/photos/33613314/pexels-photo-33613314.jpeg","","https://campus.ort.edu.ar/semanademayo"
"ACT-0101","Día del Veterano y de los Caídos en la Guerra de Malvinas","Día de homenaje y memoria. Invita a reflexionar sobre el conflicto bélico del Atlántico Sur, la dictadura militar que lo enmarcó y la reivindicación de la soberanía desde una mirada de paz.","Abril","2","Efemérides nacionales","publicado","Interna","Fechas patrias","Ciencias Sociales","https://images.pexels.com/photos/33613314/pexels-photo-33613314.jpeg","","https://campus.ort.edu.ar/neo/articulo/1048878/docentes-2-0-edicion-3"
"ACT-0104","Día Mundial de la Actividad Física","Jornada que destaca los beneficios del movimiento para la salud integral. Pedagógicamente, promueve el conocimiento sobre el cuerpo, el bienestar físico y emocional y la integración mediante el deporte.","Abril","6","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad; Salud y ambiente","Educación Física","","","https://campus.ort.edu.ar/enmovimiento"
"ACT-0106","Día Mundial de la Salud","Concientiza sobre problemáticas sociosanitarias. Desde un abordaje educativo, permite estudiar la prevención de enfermedades, la salud pública y el bienestar como un derecho universal.","Abril","7","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://campus.ort.edu.ar/enmovimiento"
"ACT-0118","Día Mundial del Arte","Reconoce el arte como vehículo indispensable para la creatividad y la innovación humanas. Fomenta el análisis de distintas expresiones estéticas y su interrelación con otras áreas del saber.","Abril","15","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Arte","","","https://editorial.ort.edu.ar/invitados/arte"
"ACT-0123","Día Mundial de las Telecomunicaciones y la Sociedad de la Información","Destaca la transformación impulsada por las tecnologías. Invita a educar en ciudadanía digital, la búsqueda crítica de información en internet y la superación de la brecha digital.","Abril","17","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Sociales; Educación Tecnológica","","","https://campus.ort.edu.ar/articulo/1866379"
"ACT-0127","Día de la Convivencia en la Diversidad","Fomenta el respeto por las diferencias culturales, religiosas y de pensamiento. Resulta clave para trabajar la prevención del acoso escolar (bullying), la ciberciudadanía y los entornos libres de violencia.","Abril","19","Efemérides nacionales","publicado","Interna","Derechos humanos; ESI","Ciencias Sociales","","","https://campus.ort.edu.ar/ciudadaniadigital"
"ACT-0135","Día del Aborigen Americano","Reivindica los derechos de los pueblos originarios. Promueve el estudio historiográfico y geográfico de las comunidades indígenas, y la valoración de la herencia cultural frente a los conflictos territoriales.","Abril","19","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://editorial.ort.edu.ar/links/1124874/categoria/125889/1"
"ACT-0137","Día Mundial de la Creatividad y la Innovación","Alienta el pensamiento lateral y la resolución de problemas de manera no convencional. Desde la escuela, fomenta el aprendizaje basado en proyectos y el uso de múltiples lenguajes comunicacionales.","Abril","21","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Arte","","","https://editorial.ort.edu.ar/servicio/treeview/1591223"
"ACT-0147","Día Mundial de la Tierra","Día de reflexión sobre nuestro impacto ambiental. Promueve la educación para la sustentabilidad, el estudio del cambio climático y la búsqueda de soluciones para proteger nuestro hogar común.","Abril","22","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://editorial.ort.edu.ar/links/953850/categoria/103052/1"
"ACT-0151","Día Internacional de las Niñas en las TIC","Busca acortar la brecha de género en el sector tecnológico. Pedagógicamente orienta la reflexión sobre sesgos, fomenta vocaciones científicas en niñas y adolescentes y entrelaza la ESI con la informática.","Abril","25","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad; ESI","Educación Tecnológica","","","https://campus.ort.edu.ar/articulo/2021567"
"ACT-0154","Día Mundial del Libro y del Derecho de Autor","Fomenta el hábito de la lectura, fomenta la industria editorial y protege la propiedad intelectual mediante el derecho de autor, enriqueciendo cultural y cognitivamente a la comunidad educativa.","Abril","23","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Lengua y literatura","","","https://campus.ort.edu.ar/articulo/1866406"
"ACT-0155","Día de Acción por la Tolerancia y el Respeto entre los Pueblos (1er genocidio del Siglo XX Pueblo Armenio)","Recuerda a las víctimas del genocidio armenio. Permite analizar pedagógicamente temas como el prejuicio, el etiquetado y los peligros de la discriminación institucionalizada en la historia contemporánea.","Abril","24","Efemérides nacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/825922#top"
"ACT-0157","Día del Animal","Jornada para recordar los derechos de los animales y la preservación de especies. Permite, desde las ciencias, estudiar dinámicas de ecosistemas, fauna autóctona y el impacto de especies introducidas.","Abril","29","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://editorial.ort.edu.ar/servicio/treeview/1123922#top"
"ACT-0185","Día de la Constitución Nacional","Conmemora la sanción de la ley suprema argentina de 1853. Facilita la enseñanza sobre el sistema republicano, las declaraciones, los derechos y las garantías civiles en Formación Ética y Ciudadana.","Mayo","1","Efemérides nacionales","publicado","Interna","Fechas patrias","Ciencias Sociales","","",""
"ACT-0186","Día Mundial Contra el Acoso Escolar","Día orientado a generar conciencia sobre el bullying. Proporciona una oportunidad para trabajar proyectos de buena convivencia, fomento de la empatía y la prevención de la violencia en el ecosistema escolar y digital.","Mayo","2","Efemérides internacionales","publicado","Interna","Educación; ESI","Todas; Ciencias Sociales","","","https://campus.ort.edu.ar/articulo/1866374"
"ACT-0188","Día de la Minería","Promueve el estudio de la actividad extractiva y su impacto socioeconómico y ambiental a lo largo de la historia. Permite analizar cadenas productivas globales y los conflictos socio-ambientales asociados.","Mayo","7","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales; Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/1276404#top"
"ACT-0189","Día Internacional contra la Discriminación por Orientación Sexual e Identidad de Género","Llama a erradicar la violencia hacia la comunidad LGBTTIQ+. Dentro de la escuela, es una fecha central para la ESI, promoviendo el derecho a la identidad, el respeto irrestricto y la convivencia igualitaria.","Mayo","17","Efemérides internacionales","publicado","Interna","Derechos humanos; ESI","Ciencias Sociales","","","https://campus.ort.edu.ar/ciudadaniadigital"
"ACT-0191","Día Mundial del Reciclaje","Incentiva a repensar nuestra gestión de los residuos. En sentido pedagógico, permite enseñar sobre la regla de las 3R (Reducir, Reutilizar, Reciclar), la economía circular y la prevención de la contaminación.","Mayo","17","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://campus.ort.edu.ar/cambio/servicio/treeview/1972076"
"ACT-0198","Día Internacional de los Museos","Reconoce a los museos como instituciones fundamentales de cuidado del patrimonio cultural, y nos invita a reflexionar sobre nuestra propia historia a través de sus colecciones y de recorridos interactivos.","Mayo","18","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Sociales; Arte","","","https://editorial.ort.edu.ar/servicio/treeview/%20826183"
"ACT-0201","Día Mundial de la Diversidad Cultural para el Diálogo y el Desarrollo","Fecha para reconocer el valor y la riqueza de la variedad de culturas. Propugna la educación en la interculturalidad, analizando nuestras múltiples identidades individuales y colectivas.","Mayo","21","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad; ESI","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/%20825530"
"ACT-0203","Día Mundial de la Diversidad Biológica","Alerta sobre la pérdida alarmante de especies y ecosistemas. Habilita el estudio de la compleja red de la vida, su estado actual y nuestro deber de conservación activa frente a intervenciones humanas.","Mayo","22","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://campus.ort.edu.ar/articulo/2026774"
"ACT-0218","Nacimiento de Manuel Belgrano","Efeméride para evocar no solo su figura en la creación de la bandera, sino también su ideario educativo y económico, permitiendo estudiar integralmente sus aportes en la formación del país.","Junio","3","Efemérides nacionales","publicado","Interna","Fechas patrias","Ciencias Sociales","","","https://campus.ort.edu.ar/diadelabandera"
"ACT-0219","Día Mundial del Medio Ambiente","Jornada global para fomentar la acción ambiental favorable. Sirve de marco para actividades educativas sobre alteraciones ecosistémicas, cambio climático global y la participación ciudadana en su defensa.","Junio","5","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales; Ciencias Sociales","","","https://editorial.ort.edu.ar/links/953850/categoria/103052/1"
"ACT-0222","Día del Periodista","Celebra la labor periodística y la fundación del primer periódico patrio (La Gazeta de Buenos Ayres). Es una oportunidad para educar en pensamiento crítico y el abordaje de crónicas en prácticas del lenguaje.","Junio","7","Efemérides nacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Sociales; Lengua y Literatura","","","https://editorial.ort.edu.ar/servicio/treeview/1207333"
"ACT-0223","Día Mundial contra el Trabajo Infantil","Llamado a erradicar las prácticas que atentan contra la educación y la salud de las infancias. Desde la Formación Ética se aborda para promover una profunda reflexión sobre los derechos inalienables del niño.","Junio","12","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/827968"
"ACT-0226","Día de los Adolescentes y Jóvenes por la Inclusión Social","Invita a asegurar la participación plena de la juventud en la toma de decisiones. Permite abordar temáticas de inclusión frente al acoso y la construcción de ciudadanía comprometida y solidaria.","Junio","12","Efemérides nacionales","publicado","Interna","Derechos humanos; ESI","Ciencias Sociales","","",""
"ACT-0236","Día Nacional del Libro","Conmemora la importancia histórica de la literatura nacional. Pedagógicamente, busca acercar a la población estudiantil al acervo bibliográfico, fomentando el placer por la lectura y la identidad cultural.","Junio","15","Efemérides nacionales","publicado","Interna","Ciencia; cultura y sociedad","Lengua y literatura","","","https://editorial.ort.edu.ar/invitados/lengua"
"ACT-0238","Día de la Bandera/Fallecimiento de Manuel Belgrano","Recuerda tanto a Manuel Belgrano como a la Bandera Nacional. Promueve pensar el concepto de Patria y de símbolos compartidos en contextos actuales de la sociedad argentina.","Junio","20","Efemérides nacionales","publicado","Interna","Fechas patrias","Ciencias Sociales","","","https://editorial.ort.edu.ar/video/2018712/20-de-junio"
"ACT-0240","Día Mundial de los Refugiados","Insta a reflexionar sobre la crisis mundial de desplazamiento forzado. Es fundamental para tratar, desde las Ciencias Sociales, las causas y derechos vinculados al asilo bajo la óptica de los Derechos Humanos.","Junio","20","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/%20962965"
"ACT-0242","Día Mundial Olímpico","Celebra la fundación de los Juegos Olímpicos modernos, fomentando los valores deportivos. Educativamente promueve conceptos de compañerismo, tenacidad y el impacto del movimiento para la salud integral.","Junio","23","Efemérides internacionales","publicado","Interna","Deporte","Educación física","","",""
"ACT-0243","Día Internacional del Orgullo LGBTTIQ+","Recuerda las gestas históricas por los derechos de la comunidad de la diversidad sexual y permite afianzar conceptos de la ESI como el derecho al trato digno y libre de discriminación.","Junio","28","Efemérides internacionales","publicado","Interna","Esi","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/825922#top"
"ACT-0275","Día de la Agricultura Nacional","Día que conmemora la actividad económica fundacional de la Argentina. Invita a analizar las diferentes formas y transformaciones tecnológicas, sociales y ambientales del sector agropecuario hasta la actualidad.","Julio","2","Efemérides nacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://editorial.ort.edu.ar/servicio/treeview/1446170"
"ACT-0277","Día de la Conservación del Suelo","Fomenta la protección de los recursos edáficos contra la degradación. Pedagógicamente, impulsa el estudio geográfico de los usos del suelo, las fronteras agropecuarias y la pérdida de tierras fértiles.","Julio","7","Efemérides nacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://editorial.ort.edu.ar/servicio/treeview/826678"
"ACT-0279","Día de la Declaración de la Independencia","Conmemora un hito insoslayable: la formal emancipación de todo dominico extranjero de Argentina de 1816. Anima el debate permanente sobre los ecos y desafíos de la soberanía e independencia en el presente.","Julio","9","Efemérides nacionales","publicado","Interna","Fechas patrias","Ciencias Sociales","","","https://campus.ort.edu.ar/actos/9dejulio"
"ACT-0280","Día Mundial de la Población","Permite concienciar sobre la planificación familiar, los movimientos migratorios, el envejecimiento y las pirámides demográficas, enlazando la Geografía con la interpretación de estadísticas.","Julio","11","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/1075287#top"
"ACT-0292","Fallecimiento del General José de San MartÍn","Fecha que insta a revisar el significado de los valores que movilizaron a José de San Martín y el proyecto colectivo de la emancipación y libertad en el continente americano.","Agosto","17","Efemérides nacionales","publicado","Interna","Fechas patrias","Ciencias Sociales","","","https://campus.ort.edu.ar/actos/sanmartin"
"ACT-0296","Día Nacional del Árbol","Día instaurado para reconocer los beneficios de los árboles y la silvicultura nacional, siendo propicio para actividades prácticas de plantación escolar y promoción de la biodiversidad ambiental.","Agosto","29","Efemérides nacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://campus.ort.edu.ar/cambio/servicio/treeview/1972261#top"
"ACT-0330","Día Nacional del Inmigrante","Homenajea el aporte múltiple de todas las personas que decidieron poblar el país a lo largo de su historia. Promueve la comprensión de las migraciones, la asimilación cultural y la historia oral.","Septiembre","4","Efemérides nacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://campus.ort.edu.ar/secundaria/almagro/cienciassociales/historiaoral"
"ACT-0333","Día Nacional de la Historieta Argentina","Enaltece el comic y la novela gráfica de origen argentino. Permite poner en valor un género artístico y literario que facilita y agiliza abordajes educativos y de lectocomprensión muy potentes.","Septiembre","4","Efemérides nacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Sociales","","","https://campus.ort.edu.ar/articulo/1866398"
"ACT-0338","Día Internacional del Aire Limpio por un Cielo Azul","Hace hincapié en la urgencia global por combatir la contaminación atmosférica. Invita a integrar la responsabilidad ciudadana, la educación ambiental integral y su influencia en el bienestar social.","Septiembre","7","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://campus.ort.edu.ar/articulo/1866408"
"ACT-0348","Día Internacional de la Democracia","Celebra los principios democráticos. Pedagógicamente constituye un eje primordial para promover la participación responsable, la valoración del debate, el consenso y las instituciones en el aula.","Septiembre","15","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://campus.ort.edu.ar/articulo/1963728"
"ACT-0352","Día Internacional de Protección de la Capa de Ozono","Concientiza sobre la urgente necesidad de cuidar el escudo protector de nuestro planeta, introduciendo el debate medioambiental a fin de proponer usos racionales e innovadores para las industrias.","Septiembre","16","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://campus.ort.edu.ar/articulo/1866408"
"ACT-0369","Día Internacional contra la Explotación Sexual y la Trata de Personas","Visibiliza una forma extrema de violencia y sometimiento humano. Permite el análisis social y mediático de sus formas de operar, y fomenta medidas de cuidado preventivo en los estudiantes.","Septiembre","23","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/827968"
"ACT-0370","Día Internacional de las Lenguas de Señas","Jornada que propugna la valoración de las lenguas de señas en pro de la plena inclusión de los individuos con discapacidad auditiva y su acceso igualitario a la educación, la vida cívica y todos sus derechos.","Septiembre","23","Efemérides internacionales","publicado","Interna","Otros","Lengua y literatura","","","https://campus.ort.edu.ar/articulo/1866388"
"ACT-0376","Día Nacional de la Conciencia Ambiental","Conmemora la promulgación en Argentina de una voluntad explícita sobre el cuidado del agua y los suelos, y permite plantear la necesidad ineludible de virar hacia fuentes de energías limpias.","Septiembre","27","Efemérides nacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales; Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/985752"
"ACT-0384","Día del Respeto a la Diversidad Cultural","Modificación instaurada sobre el ex 'Día de la Raza'. Un giro clave para promover la reflexión histórica acerca de los derechos de los pueblos originarios de América, la pluriculturalidad y la descolonización cultural.","Octubre","12","Efemérides nacionales","publicado","Interna","Fechas patrias","Ciencias Sociales","","","https://campus.ort.edu.ar/actos/12deoctubre"
"ACT-0390","Día Mundial del Hábitat","Recuerda al mundo el poder y la responsabilidad conjunta para moldear y propugnar mejoras sustentables para nuestro entorno físico en los pueblos y las ciudades donde crecemos.","Octubre","7","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://campus.ort.edu.ar/articulo/1866408"
"ACT-0410","Día Internacional para la Erradicación de la Pobreza","Llama la atención sobre la necesidad de acabar con la miseria en todas sus dimensiones. Invita al estudiante a pensar sobre la inequidad profunda, un desarrollo sostenible inclusivo e incentivar el cooperativismo genuino.","Octubre","17","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/1464376"
"ACT-0416","Día Nacional del Derecho a la Identidad","Institucionalizado en honor a Abuelas de Plaza de Mayo. Su objetivo es reflexionar sobre este derecho básico fundamental. Pedagógicamente se une con el derecho tanto al propio nombre como a la construcción de ciudadanía e identidad digital.","Octubre","22","Efemérides nacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://campus.ort.edu.ar/ciudadaniadigital"
"ACT-0423","Día Internacional contra el Cambio Climático","Invoca compromisos a favor del clima, la protección de los ecosistemas globales para que el futuro de las generaciones se desarrolle en un hábitat estable y armonioso.","Octubre","24","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://editorial.ort.edu.ar/servicio/treeview/985752"
"ACT-0460","Día Internacional del Aire Puro","Demanda detener o ralentizar todos los procesos que menoscaban seriamente la salud bronquial de la Tierra, propiciando políticas efectivas y educación ambiental rigurosa para la mitigación del smog.","Noviembre","16","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://campus.ort.edu.ar/cambio"
"ACT-0467","Día Internacional de los Derechos del Niño","Celebra los grandes progresos y el tratado unánime de los derechos innatos de los menores, pero remarcando las problemáticas vigentes por asegurar para ellos pleno acceso a salud, esparcimiento y educación.","Noviembre","20","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://campus.ort.edu.ar/ciudadaniadigital"
"ACT-0472","Día de la Música","Homenajea al arte de organizar coherentemente los sonidos en distintos contextos y estilos, posibilitando a las personas de expresarse subjetividad, cooperar grupalmente o evocar legados en común.","Noviembre","22","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Arte","","","https://campus.ort.edu.ar/musica"
"ACT-0474","Día Internacional de la Eliminación de la Violencia contra la Mujer","Día para visibilizar toda la violencia perpetrada contra las mujeres a nivel doméstico, público o virtual, y que impone la necesidad de re-involucrarse en las concepciones sobre perspectiva de género y la Educación Sexual Integral.","Noviembre","25","Efemérides internacionales","publicado","Interna","Derechos humanos; ESI","Ciencias Sociales","","","https://campus.ort.edu.ar/educacionsexualintegral"
"ACT-0505","Día Mundial de la Lucha contra el Sida","Propone la expansión y consolidación global como un solo colectivo humano de las acciones necesarias para erradicar las infecciones de transmisión sexual mediante la educación y el mutuo respeto.","Diciembre","1","Efemérides internacionales","publicado","Interna","Salud y ambiente; ESI","Ciencias Naturales","","","https://editorial.ort.edu.ar/servicio/treeview/1156264#top"
"ACT-0506","Día Internacional para la Abolición de la Esclavitud","Rememora un hito definitorio sobre la consideración de que las prácticas abyectas de explotación humana son deleznables. Abre interrogantes históricos y actuales sobre las desigualdades e infamias del colonialismo.","Diciembre","2","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/1537871"
"ACT-0509","Dia Mundial del Suelo","Jornada que señala que este sostén irreemplazable de cada ser y cada siembra no debe ser dañado irreparablemente. Invita a abordar procesos que minimicen la erosión, la deforestación y la desertificación global.","Diciembre","5","Efemérides internacionales","publicado","Interna","Salud y ambiente","Ciencias Naturales","","","https://editorial.ort.edu.ar/servicio/treeview/1446170"
"ACT-0513","Día Internacional de los Derechos Humanos","Ratifica y defiende una de las construcciones fundamentales del pensamiento universal: los inherentes Derechos Humanos de todos como dique frente a la tiranía, la guerra y el abuso irreflexivo del Estado.","Diciembre","10","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/827968"
"ACT-0515","Día de la Recuperación de la Democracia","Conmemora, en sintonía con la ratificación de los Derechos Humanos, el advenimiento del ansiado regreso institucional tras ciclos de autoritarismo en Argentina. Representa un eje insustituible para reflexionar y salvaguardar una vida en estado de derecho.","Diciembre","10","Efemérides nacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","","https://editorial.ort.edu.ar/servicio/treeview/827968#top"
"ACT-0520","Día Internacional del Migrante","Reflexiona sobre las condiciones asimétricas de todas y todos los que migran con la esperanza de poder ser, crecer, proveer a sus familiar y, en suma, salvaguardar y dignificar sus experiencias lejos del entorno del cual parten.","Diciembre","18","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","https://campus.ort.edu.ar/static/archivos/destacados/2313926","","https://campus.ort.edu.ar/secundaria/almagro/cienciassociales/historiaoral"
"ACT-0601","Día Internacional de la Educación","Jornada proclamada por Naciones Unidas para celebrar el papel de la educación en la paz y el desarrollo. Pedagógicamente, impulsa la reflexión en torno del acceso equitativo e inclusivo a una educación de calidad en todo el mundo.","Enero","24","Efemérides internacionales","publicado","Interna","Educación","Todas","","",""
"ACT-0602","Día Mundial de los Docentes","Instaurado por la UNESCO, este día pone en valor el trabajo y compromiso de las y los educadores para guiar a las futuras ciudadanías. Favorece la reflexión sobre los grandes desafíos y transformaciones éticas de la profesión.","Octubre","5","Efemérides internacionales","publicado","Interna","Educación","Todas","","",""
"ACT-0603","Día del Maestro","Conmemora en Argentina el fallecimiento de Domingo Faustino Sarmiento, un hito para homenajear a la docencia de nivel primario y repensar constantemente las bases de la educación pública y su lugar en el tejido social.","Septiembre","11","Efemérides nacionales","publicado","Interna","Educación","Todas","","",""
"ACT-0604","Día del Profesor","Se celebra en honor al fallecimiento de José Manuel Estrada. Destaca el quehacer pedagógico en las escuelas secundarias y de nivel superior, siendo una pausa propicia para valorizar el pensamiento crítico y la mediación del conocimiento.","Septiembre","17","Efemérides nacionales","publicado","Interna","Educación","Todas","","",""
"ACT-0605","Día del Estudiante","Coincidente con la llegada de la primavera en el hemisferio sur, en la Argentina celebra la centralidad de las y los estudiantes. Propone generar espacios de escucha, esparcimiento, construcción democrática y fortalecimiento del vínculo escolar.","Septiembre","21","Efemérides nacionales","publicado","Interna","Educación","Todas","","",""
"ACT-0606","Día del Preceptor","Día dedicado a reconocer a actores fundamentales del ecosistema escolar. Los preceptores son guías permanentes y figuras de contención cotidiana que promueven buenas prácticas de convivencia y fortalecen la continuidad educativa.","Septiembre","19","Efemérides nacionales","publicado","Interna","Educación","","","",""
"ACT-0607","Día de los Jardines de Infantes y de la Maestra Jardinera","Recuerda a Rosario Vera Peñaloza, precursora de la Educación Inicial estatal. Invita a consolidar la perspectiva lúdica, la estimulación integral en la primera infancia y el rol clave del jardín como el primer espacio público de formación y socialización.","Mayo","28","Efemérides nacionales","publicado","Interna","Educación","Todas","","",""
"ACT-0608","Día Nacional de la Educación Técnica","Conmemora la creación del CONET (actual INET), resaltando la conexión innegable entre el conocimiento científico-tecnológico y la matriz productiva del país. Refuerza vocaciones en ingeniería, oficios y desarrollos informáticos sustentables.","Noviembre","15","Efemérides nacionales","publicado","Interna","Educación","Educación Tecnológica","","",""
"ACT-0609","Día Internacional de la Alfabetización","Celebra la importancia formativa y emancipadora de la lectoescritura como baluarte innegociable de la dignidad. Constituye el momento idóneo para enfatizar la formación literaria, digital y mediática para el desarrollo personal y comunitario.","Septiembre","8","Efemérides internacionales","publicado","Interna","Educación","Lengua y Literatura","","",""
"ACT-0610","Día Mundial de la Fotografía","Conmemora la presentación de la patente del daguerrotipo. Evidencia el cruce entre ciencia, tecnología y arte, promoviendo el análisis del universo visual, la alfabetización icónica y la construcción de memorias documentales.","Agosto","19","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Arte","","",""
"ACT-0611","Día Internacional del Juego","Destaca la trascendencia del componente lúdico como derecho inalienable de las infancias y pilar del desarrollo cognitivo y social. Valida pedagógicamente al juego como herramienta natural para el aprendizaje y la resolución de problemas.","Mayo","28","Efemérides internacionales","publicado","Interna","Educación","Todas","","",""
"ACT-0612","Día de las Infancias","Fecha que celebra la niñez y revalida sus derechos integrales de cuidado, salud, identidad y educación. Propicia el abordaje aúlico en torno al derecho a jugar, a aprender y a ser resguardados frente a las desigualdades socioeconómicas.","Agosto","1","Efemérides nacionales","publicado","Interna","Derechos humanos","Todas","","",""
"ACT-0613","Día Mundial del Videojuego","Reconoce la consolidación de la industria del entretenimiento digital. Invita a las ciencias computacionales a explorar la gamificación aúlica, al diseño interactivo y al debate sobre el tiempo de pantallas y hábitos de consumo.","Agosto","29","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Educación Tecnológica","","",""
"ACT-0614","Día Internacional del Diseño","Valora la disciplina del diseño gráfico, industrial e interactivo para organizar y comunicar efectivamente en un mundo complejo. Ideal para tratar la resolución creativa de problemas y la cultura proyectual en proyectos STEAM.","Abril","27","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Arte","","",""
"ACT-0615","Día de Internet","Concientiza sobre las amplias posibilidades que ofrecen las tecnologías de la información. Promueve abordar en clase los paradigmas de ciudadanía digital, inclusión tecnológica, acceso a la información y derechos digitales.","Mayo","17","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Educación Tecnológica","","",""
"ACT-0616","Día Mundial de la Televisión","Conmemora la influencia de la TV en la toma de decisiones y en la distribución de la realidad social. Promueve la alfabetización audiovisual para deconstruir discursos, interpretar noticias y comprender el rol de los mass media.","Noviembre","21","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Sociales","","",""
"ACT-0617","Día de las Redes Sociales","Permite pensar la instantaneidad y la interconexión global. Desde lo pedagógico, insta a trabajar en prevención de ciberbullying, huella digital responsable, desinformación algorítmica y relaciones interpersonales virtuales.","Junio","30","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Educación Tecnológica","","",""
"ACT-0618","Semana de la Ciudadanía y Convivencia Digital","Período designado para promover vínculos sanos en plataformas online. Facilita la aplicación transversal de normativas en ESI, prevención de violencias y reflexiones sociológicas sobre interacciones en un mundo hiperconectado.","Octubre","21","Efemérides nacionales","publicado","Interna","Educación; ESI","Educación Tecnológica","","",""
"ACT-0619","Día Mundial de la Ciencia para la Paz y el Desarrollo","Destaca la estrecha alianza entre conocimiento científico riguroso y la construcción de sociedades pacíficas y sustentables. Fomenta debates bioéticos y subraya el rol del compromiso científico frente al cambio climático y la salud global.","Noviembre","10","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Naturales; Fisicoquímica","","",""
"ACT-0620","Día Internacional de la Luz","Celebra la infinita utilidad de la luz en la ciencia, la cultura, el arte y la educación. Habilita una ventana inmejorable para abordar espectros electromagnéticos, energías renovables fotovoltaicas y tecnologías ópticas en el área de Física.","Mayo","16","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Naturales","","",""
"ACT-0621","Día Internacional de la Mujer y la Niña en la Ciencia","Procura desarticular estereotipos en la elección de vocaciones. Es central curricularmente para empoderar a niñas en carreras STEM, promover políticas científicas igualitarias y realzar las trayectorias invisibilizadas por prejuicios.","Febrero","11","Efemérides internacionales","publicado","Interna","Derechos humanos; ESI","Ciencias Naturales","","",""
"ACT-0622","Día Internacional de la Tabla Periódica","Rinde tributo al instrumento organizativo por excelencia del universo material y químico. Abona la enseñanza del modelo atómico de los elementos, sus propiedades estructurales y el progreso mancomunado e histórico del sistema científico.","Febrero","7","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Naturales","","",""
"ACT-0623","Día Mundial de la Metrología","Celebra la disciplina milenaria de medir y estandarizar datos. Permite a las aulas reflexionar e instruir sobre metodologías de laboratorio, magnitudes, escalas y la trascendencia de validar certezas empíricas con exactitud global.","Mayo","20","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Naturales; Matemática; Fisicoquímica","","",""
"ACT-0624","Día del Químico","Homenajea en Argentina a profesionales dedicados a entender la estructuración microscópica. Favorece la valoración del trabajo que contribuye transversalmente a la producción farmacológica, sanitaria y alimentaria del ambiente cotidiano.","Diciembre","1","Efemérides nacionales","publicado","Interna","Ciencia; cultura y sociedad","Ciencias Naturales; Fisicoquímica","","",""
"ACT-0625","Día Internacional de las Matemáticas","Jornada dedicada a celebrar la belleza e importancia de las matemáticas en nuestra vida diaria. Pedagógicamente, impulsa juegos de ingenio, resolución de problemas y la desmitificación de esta disciplina en las aulas.","Marzo","14","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Matemática","","",""
"ACT-0626","Día del Software Libre","Fecha destinada a promover el uso de software de código abierto. Favorece la reflexión sobre la colaboración global, la ética hacker, la soberanía tecnológica y el desarrollo informático accesible para todos.","Septiembre","","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Educación Tecnológica","","",""
"ACT-0627","Día de la Apreciación de la Inteligencia Artificial","Día para celebrar y examinar el impacto de la IA en la humanidad. Promueve alfabetización algorítmica, debates sobre ética, sesgos y la transformación de los entornos laborales y educativos.","Julio","16","Efemérides internacionales","publicado","Interna","Ciencia; cultura y sociedad","Educación Tecnológica","","",""
"ACT-0628","Día Internacional de las Personas con Discapacidad","Promueve los derechos y el bienestar de las personas con discapacidad en todos los ámbitos. Constituye una fecha ineludible para reforzar la educación inclusiva, la accesibilidad y el diseño universal en las aulas.","Diciembre","3","Efemérides internacionales","publicado","Interna","Derechos humanos","","","",""
"ACT-0629","Día Internacional del Trabajo","Se conmemora el Día Internacional de las y los Trabajadores en homenaje a los Mártires de Chicago.","Mayo","1","Efemérides internacionales","publicado","Interna","Derechos humanos","Ciencias Sociales","","",""
"ACT-0630","Día de la Conmemoración y Recuerdo de las Víctimas de la AMIA","Jornada de memoria por el atentado terrorista perpetrado el 18 de julio de 1994 contra la sede de la Asociación Mutual Israelita Argentina en Buenos Aires. Es un momento para exigir justicia, verdad y mantener viva la memoria de las 85 víctimas.","Julio","18","Efemérides nacionales","publicado","Interna","Festividades y conmemoraciones; Derechos humanos","Ciencias Sociales; Estudios Judaicos","","",""
"ACT-0631","Día de la Memoria y la Solidaridad con las Víctimas del Atentado a la Embajada de Israel","Conmemora el ataque terrorista a la Embajada de Israel en Argentina ocurrido el 17 de marzo de 1992. Invita a reflexionar sobre la importancia de la paz, la solidaridad con las víctimas y el rechazo absoluto a toda forma de violencia terrorista.","Marzo","17","Efemérides nacionales","publicado","Interna","Festividades y conmemoraciones; Derechos humanos","Ciencias Sociales; Estudios Judaicos","","",""
`;

export interface Evento {
  id: string;
  nombre: string;
  resumen: string;
  mes: string;
  dia: string | number;
  tipo: string;
  estado: string;
  origen: string;
  tematicas: string;
  areas: string;
  imagenUrl: string;
  iconKey: string;
  enlace: string;
  isJewish?: boolean;
}

const publicImages = [
  "Dia De La Cero Discriminacion_5.png",
  "Dia Internacional de la Mujer_7-1.png",
  "Dia Internacional de la Mujer_7.png",
  "Dia Mundial del Suelo.png",
  "Dia de la Cero Discriminacion.png",
  "Dia del Campo.png",
  "Dia del Campo_6.png",
  "Día Internacional Contra la Discriminación por Orientación Sexual e Identidad de Género.png",
  "Día Internacional contra el Cambio Climático.png",
  "Día Internacional de Conmemoración en Memoria de las Víctimas del Holocausto.png",
  "Día Internacional de Protección de la Capa de Ozono.png",
  "Día Internacional de la Alfabetización.png",
  "Día Internacional de la Democracia.png",
  "Día Internacional de la Educación.png",
  "Día Internacional de la Eliminación de la Violencia contra la Mujer.png",
  "Día Internacional de la Luz.png",
  "Día Internacional de la Mujer y la Niña en la Ciencia.png",
  "Día Internacional de la Tabla Periódica.png",
  "Día Internacional de las Lenguas de Señas.png",
  "Día Internacional de las Matemáticas.png",
  "Día Internacional de las Niñas en TIC.png",
  "Día Internacional de las Personas con Discapacidad.png",
  "Día Internacional de los Bosques.png",
  "Día Internacional de los Derechos Humanos.png",
  "Día Internacional de los Derechos del Niño.png",
  "Día Internacional de los Museos.png",
  "Día Internacional del Aire Limpio por un Cielo Azul.png",
  "Día Internacional del Aire Puro.png",
  "Día Internacional del Diseño.png",
  "Día Internacional del Juego.png",
  "Día Internacional del Migrante.png",
  "Día Internacional del Orgullo LGBTTIQ+.png",
  "Día Internacional para la Abolición de la Esclavitud.png",
  "Día Internacional para la Eliminación de la Discriminación Racial.png",
  "Día Internacional para la Erradicación de la Pobreza.png",
  "Día Mundial Contra el Acoso Escolar.png",
  "Día Mundial Contra el Trabajo Infantil.png",
  "Día Mundial Olímpico.png",
  "Día Mundial de la Actividad Física.png",
  "Día Mundial de la Ciencia para la Paz y el Desarrollo.png",
  "Día Mundial de la Creatividad y de la Innovación.png",
  "Día Mundial de la Diversidad Biológica.png",
  "Día Mundial de la Diversidad Cultural para el Diálogo y el Desarrollo.png",
  "Día Mundial de la Fotografía.png",
  "Día Mundial de la Justicia Social.png",
  "Día Mundial de la Lucha contra el Sida.png",
  "Día Mundial de la Metrología.png",
  "Día Mundial de la Metrología_3-1.png",
  "Día Mundial de la Metrología_3.png",
  "Día Mundial de la Población.png",
  "Día Mundial de la Poesía.png",
  "Día Mundial de la Radio.png",
  "Día Mundial de la Salud.png",
  "Día Mundial de la Televisión.png",
  "Día Mundial de la Tierra.png",
  "Día Mundial de las Telecomunicaciones y la Socieda de la Información.png",
  "Día Mundial de los Derechos de las y los Consumidores.png",
  "Día Mundial de los Docentes.png",
  "Día Mundial de los Humedales.png",
  "Día Mundial de los Refugiados.png",
  "Día Mundial del Agua.png",
  "Día Mundial del Arte.png",
  "Día Mundial del Hábitat.png",
  "Día Mundial del Libro y del Derecho de Autor.png",
  "Día Mundial del Libro y del Derecho de Autor_4.png",
  "Día Mundial del Medio Ambiente.png",
  "Día Mundial del Reciclaje.png",
  "Día Mundial del Teatro.png",
  "Día Mundial del Videojuego.png",
  "Día Nacional de la Conciencia Ambiental.png",
  "Día Nacional de la Educación Técnica.png",
  "Día Nacional de la Historieta Argentina.png",
  "Día Nacional del Agua.png",
  "Día Nacional del Derecho a la Identidad.png",
  "Día Nacional del Inmigrante.png",
  "Día Nacional del Libro.png",
  "Día Nacional del Árbol.png",
  "Día de Acción por la Tolerancia y el Respeto entre los Pueblos (Primer Genocidio del Siglo XX Pueblo Armenio).png",
  "Día de Internet.png",
  "Día de la Agricultura Nacional.png",
  "Día de la Apreciación de la Inteligencia Artificial.png",
  "Día de la Bandera   Fallecimiento de Manuel Belgrano.png",
  "Día de la Conservación del Suelo.png",
  "Día de la Constitución Nacional.png",
  "Día de la Constitución Nacional_2.png",
  "Día de la Convivencia en la Diversidad.png",
  "Día de la Declaración de la Independencia.png",
  "Día de la Explotación Sexual y de la Trata de Personas.png",
  "Día de la Memoria por la Verdad y la Justicia.png",
  "Día de la Minería.png",
  "Día de la Música.png",
  "Día de la Recuperación de la Democracia.png",
  "Día de la Revolución de Mayo de 1810.png",
  "Día de las Infancias.png",
  "Día de las Redes Sociales.png",
  "Día de los Adolescentes y Jóvenes por la Inclusión Social.png",
  "Día de los Jardines de Infantes y de la Maestra Jardinera.png",
  "Día del Aborigen Americano.png",
  "Día del Animal.png",
  "Día del Derecho a la Verdad.png",
  "Día del Estudiante.png",
  "Día del Maestro.png",
  "Día del Periodista.png",
  "Día del Preceptor.png",
  "Día del Profesor.png",
  "Día del Químico.png",
  "Día del Respeto a la Diversidad Cultural.png",
  "Día del Software Libre.png",
  "Día del Veterano y de los Caídos en la Guerra de Malvinas.png",
  "Fallecimiento del Gral José de San Martín.png",
  "Iom HaAtzmaut.png",
  "Iom HaShoa.png",
  "Iom HaZikaron.png",
  "Iom Kipur.png",
  "Januca.png",
  "Nacimiento de Domingo Faustino Sarmiento.png",
  "Nacimiento de Manuel Belgrano.png",
  "Nacimiento del Gral Don José de San Martín.png",
  "Pesaj.png",
  "Pesaj_1.png",
  "Purim.png",
  "Rosh Hashaná.png",
  "Semana de la Ciudadanía y Convivencia Digital.png",
  "Shavuot.png",
  "Sheminí Atzeret.png",
  "Simjat Tora.png",
  "Sucot.png",
  "Tu Bishvat.png",
  "Día Internacional del Trabajo.png",
  "Día de la Conmemoración y Recuerdo de las Víctimas de la AMIA.png",
  "Día de la Memoria y la Solidaridad con las Víctimas del Atentado a la Embajada de Israel.png"
]
;

function matchImageForEvent(eventName: string): string {
  const normEvent = eventName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");

  if (normEvent.includes('memoria') && normEvent.includes('verdad') && normEvent.includes('justicia')) return "/Día de la Memoria por la Verdad y la Justicia.png";
  if (normEvent.includes('conmemoracion') && normEvent.includes('victimas') && normEvent.includes('holocausto')) return "/Día Internacional de Conmemoración en Memoria de las Víctimas del Holocausto.png";
  if (normEvent.includes('sanmartin') && normEvent.includes('nacimiento')) return "/Nacimiento del Gral Don José de San Martín.png";
  if (normEvent.includes('sanmartin') && normEvent.includes('fallecimiento')) return "/Fallecimiento del Gral José de San Martín.png";
  if (normEvent.includes('belgrano') && normEvent.includes('fallecimiento')) return "/Día de la Bandera   Fallecimiento de Manuel Belgrano.png";
  if (normEvent.includes('belgrano') && normEvent.includes('nacimiento')) return "/Nacimiento de Manuel Belgrano.png";
  if (normEvent.includes('mujer') && normEvent.includes('internacional') && !normEvent.includes("ninas") && !normEvent.includes("violencia")) return "/Dia Internacional de la Mujer_7-1.png";
  if (normEvent.includes('armenio')) return "/Día de Acción por la Tolerancia y el Respeto entre los Pueblos (Primer Genocidio del Siglo XX Pueblo Armenio).png";
  if (normEvent.includes('explotacionsexual')) return "/Día de la Explotación Sexual y de la Trata de Personas.png";
  if (normEvent.includes('derechoalaverdad')) return "/Día del Derecho a la Verdad.png";
  if (normEvent.includes('telecomunicaciones')) return "/Día Mundial de las Telecomunicaciones y la Socieda de la Información.png";
  if (normEvent.includes('creatividad') && normEvent.includes('innovacion')) return "/Día Mundial de la Creatividad y de la Innovación.png";
  if (normEvent.includes('ninasen')) return "/Día Internacional de las Niñas en TIC.png";

  const normalizedImages = publicImages.map(img => ({
    original: img,
    norm: img.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")
  }));

  const exact = normalizedImages.find(img => img.norm === normEvent + "png");
  if (exact) return '/' + exact.original;

  const starts = normalizedImages.find(img => img.norm.startsWith(normEvent));
  if (starts) return '/' + starts.original;
  
  const includes = normalizedImages.find(img => img.norm.includes(normEvent) || normEvent.includes(img.norm.replace("png", "")));
  if (includes) return '/' + includes.original;

  return "";
}

export function parseCsvEvents(): Evento[] {
  const result = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });
  
  return result.data.map((row: any) => {
    const defaultImage = typeof window !== 'undefined' && row.imagenUrl && row.imagenUrl.startsWith('http') ? row.imagenUrl : '';
    const localImage = matchImageForEvent(row.nombre);
    
    return {
      ...row,
      dia: parseInt(row.dia, 10) || 1, // Fallback to 1 if day is empty or missing
      imagenUrl: localImage || defaultImage
    };
  });
}
