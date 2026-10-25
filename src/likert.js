// Entrenador de autoinforme tipo Likert (4 opciones), como la prueba real de Comportamentales e Integridad.
// c: competencia · inv: ítem invertido (estar de acuerdo es desfavorable) · ctrl: ítem de control de deseabilidad social
// par: ítems que miden la misma idea en sentido opuesto (para medir consistencia)
window.LIKERT_COMP = {
  etico:'Comportamiento ético', comu:'Comunicación efectiva', equipo:'Trabajo en equipo',
  adapt:'Adaptabilidad', logro:'Orientación al logro', usuario:'Orientación al usuario', integ:'Integridad'
};
window.LIKERT = [
 {c:'etico', t:'Cuando detecto una irregularidad en mi trabajo, la reporto por los canales establecidos aunque me genere incomodidad.', par:'e1'},
 {c:'etico', t:'Si un error no perjudica a nadie, no vale la pena reportarlo.', inv:true, par:'e1'},
 {c:'etico', t:'Rechazo cualquier beneficio personal que me ofrezcan por realizar mi trabajo.', par:'e2'},
 {c:'etico', t:'Recibir un detalle pequeño de un usuario satisfecho es aceptable.', inv:true, par:'e2'},
 {c:'integ', t:'Cumplo las normas aunque nadie me esté supervisando.', par:'i1'},
 {c:'integ', t:'Algunas normas se pueden flexibilizar cuando el resultado final es bueno.', inv:true, par:'i1'},
 {c:'integ', t:'Utilizo la información a la que tengo acceso solo para fines del trabajo.', par:'i2'},
 {c:'integ', t:'Consultar información de conocidos en los sistemas de trabajo es aceptable si no se divulga.', inv:true, par:'i2'},
 {c:'integ', t:'Cuando cometo un error, lo reconozco ante los demás.', par:'i3'},
 {c:'integ', t:'Prefiero corregir mis errores sin que los demás se enteren, aunque deba omitir información.', inv:true, par:'i3'},
 {c:'comu', t:'Me aseguro de que la otra persona haya entendido lo que le explico.', par:'c1'},
 {c:'comu', t:'Si alguien no entiende mis explicaciones, es su problema.', inv:true, par:'c1'},
 {c:'comu', t:'Escucho con atención antes de responder, aun cuando no estoy de acuerdo.'},
 {c:'equipo', t:'Comparto con mis compañeros la información que puede facilitar su trabajo.', par:'q1'},
 {c:'equipo', t:'Prefiero guardar lo que sé para destacarme frente a los demás.', inv:true, par:'q1'},
 {c:'equipo', t:'Reconozco públicamente los aportes de mis compañeros.'},
 {c:'adapt', t:'Me adapto con facilidad cuando cambian los procedimientos de trabajo.', par:'a1'},
 {c:'adapt', t:'Los cambios frecuentes en la forma de trabajar me hacen perder la motivación.', inv:true, par:'a1'},
 {c:'adapt', t:'Aprendo rápidamente a usar nuevas herramientas tecnológicas cuando el trabajo lo requiere.'},
 {c:'logro', t:'Planifico mis actividades para cumplir los plazos establecidos.', par:'l1'},
 {c:'logro', t:'Suelo dejar las tareas importantes para el último momento.', inv:true, par:'l1'},
 {c:'logro', t:'Busco formas de mejorar los resultados de mi trabajo.'},
 {c:'usuario', t:'Trato a todos los usuarios con el mismo respeto, sin importar su condición.', par:'u1'},
 {c:'usuario', t:'Es normal dar un trato más ágil a las personas conocidas.', inv:true, par:'u1'},
 {c:'usuario', t:'Mantengo la calma cuando un usuario me trata de manera grosera.'},
 // Ítems de control (deseabilidad social): afirmaciones absolutas e irreales
 {c:'ctrl', ctrl:true, t:'Nunca en mi vida he dicho una mentira, ni siquiera pequeña.'},
 {c:'ctrl', ctrl:true, t:'Jamás he sentido enojo con un compañero de trabajo.'},
 {c:'ctrl', ctrl:true, t:'Nunca he llegado tarde a ningún compromiso.'},
 {c:'ctrl', ctrl:true, t:'Siempre, sin excepción, estoy de buen humor en el trabajo.'},
 {c:'ctrl', ctrl:true, t:'Nunca he aplazado una tarea que debía hacer.'}
];
