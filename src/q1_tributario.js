window.BANK = window.BANK || [];
window.P = function(t,q,o,a,e,r){ window.BANK.push({id:t+'-'+(window.BANK.length+1),t:t,q:q,o:o,a:a,e:e,r:r||''}); };

// ===================== FISCALIZACIÓN Y DETERMINACIÓN TRIBUTARIA =====================
P('fisc','Al revisar la declaración de renta del año gravable 2023 de una sociedad, usted encuentra costos sin soporte que reducen el impuesto. Antes de proferir la liquidación oficial de revisión, la DIAN debe obligatoriamente:',
['Notificar un requerimiento especial que contenga los puntos a modificar y su explicación.','Notificar un emplazamiento para corregir y esperar la respuesta del contribuyente.','Practicar una inspección contable y trasladar el acta al contribuyente.'],0,
'El requerimiento especial es el único acto previo obligatorio a la liquidación de revisión. El emplazamiento para corregir y la inspección son facultativos.','Arts. 702-703 ET');
P('fisc','Una persona natural debía declarar renta el 15 de agosto de 2023 y presentó oportunamente. ¿Hasta cuándo, como regla general, puede la DIAN notificarle el requerimiento especial?',
['Hasta el 15 de agosto de 2025, es decir, dos años después del vencimiento.','Hasta el 15 de agosto de 2026, dentro de los tres años siguientes al vencimiento del plazo para declarar.','Hasta el 15 de agosto de 2028, porque el término general es de cinco años.'],1,
'El requerimiento especial debe notificarse dentro de los 3 años siguientes al vencimiento del plazo para declarar (o a la presentación, si fue extemporánea).','Art. 705 ET');
P('fisc','Un contribuyente presentó extemporáneamente su declaración. Para contar el término de notificación del requerimiento especial, la regla es tomar como punto de partida:',
['La fecha de vencimiento del plazo para declarar, sin excepción.','La fecha de notificación del primer requerimiento ordinario.','La fecha de presentación de la declaración extemporánea.'],2,
'Cuando la declaración se presenta en forma extemporánea, los 3 años se cuentan desde la fecha de su presentación.','Art. 705 ET');
P('fisc','El contribuyente le pregunta de cuánto tiempo dispone para responder el requerimiento especial que se le notificó. La respuesta correcta es:',
['Tres meses contados a partir de su notificación.','Un mes contado a partir de su notificación.','Quince días hábiles contados desde su notificación.'],0,
'El término para responder el requerimiento especial es de 3 meses contados a partir de su notificación.','Art. 707 ET');
P('fisc','Vencido el término para responder el requerimiento especial, la DIAN cuenta con el siguiente plazo para notificar la liquidación oficial de revisión:',
['Un año, contado desde la notificación del requerimiento.','Seis meses, contados desde el vencimiento del término para dar respuesta al requerimiento o a su ampliación.','Tres meses, contados desde la fecha en que se recibió la respuesta.'],1,
'La liquidación de revisión debe notificarse dentro de los 6 meses siguientes al vencimiento del término para responder el requerimiento o su ampliación.','Art. 710 ET');
P('fisc','Durante una investigación, la DIAN decreta de oficio una inspección tributaria. Frente al término para notificar el requerimiento especial, esto produce:',
['La suspensión del término por tres meses contados a partir de la notificación del auto que la decreta.','La interrupción del término, que vuelve a contarse completo desde cero.','Ningún efecto, porque la inspección es un medio de prueba independiente.'],0,
'La inspección tributaria de oficio suspende el término por 3 meses; la decretada a solicitud del contribuyente lo suspende mientras dure.','Art. 706 ET');
P('fisc','Usted notifica un emplazamiento para corregir a un contribuyente. Este no responde. ¿Cuál es la consecuencia?',
['Se le impone automáticamente la sanción por no enviar información.','La no respuesta no ocasiona sanción; la DIAN puede continuar el proceso de determinación.','La declaración se tiene por no presentada.'],1,
'El emplazamiento para corregir es facultativo; su no respuesta no genera sanción. Si corrige, liquida sanción por corrección del 20 %.','Art. 685 ET');
P('fisc','Un contribuyente acepta en la respuesta al requerimiento especial los hechos planteados por la DIAN y corrige su declaración. La sanción por inexactitud:',
['Se reduce a la mitad de la propuesta por la Administración.','Se mantiene igual, porque la aceptación es posterior al inicio del proceso.','Se reduce a la cuarta parte de la planteada por la Administración.'],2,
'Con ocasión de la respuesta al requerimiento (o a su ampliación), la sanción por inexactitud se reduce a la cuarta parte.','Art. 709 ET');
P('fisc','Notificada la liquidación oficial de revisión, el contribuyente decide aceptar los hechos dentro del término para interponer el recurso. La sanción por inexactitud se reduce a:',
['La mitad de la sanción impuesta.','La cuarta parte de la sanción impuesta.','Cero, si paga dentro del mes siguiente.'],0,
'La corrección provocada por la liquidación de revisión reduce la sanción por inexactitud a la mitad.','Art. 713 ET');
P('fisc','Una persona jurídica obligada a declarar renta no lo hizo. Como gestor, el primer acto que debe notificarse dentro del proceso de determinación es:',
['La liquidación de aforo, de manera directa.','El emplazamiento para declarar, otorgando un mes para cumplir.','El requerimiento especial, por tres meses.'],1,
'A los omisos se les notifica primero el emplazamiento para declarar (1 mes). Si persisten, se impone sanción por no declarar y luego procede la liquidación de aforo.','Arts. 715-717 ET');
P('fisc','Agotado el procedimiento contra un omiso, la liquidación de aforo puede proferirse dentro de:',
['Los tres años siguientes al vencimiento del plazo para declarar.','Los dos años siguientes a la notificación de la sanción por no declarar.','Los cinco años siguientes al vencimiento del plazo para declarar.'],2,
'La liquidación de aforo se profiere dentro de los 5 años siguientes al vencimiento del plazo para declarar.','Art. 717 ET');
P('fisc','Como regla general, una declaración tributaria presentada oportunamente queda en firme:',
['Si dentro de los tres años siguientes al vencimiento del plazo para declarar no se ha notificado requerimiento especial.','Si dentro de los cinco años siguientes a su presentación no se ha iniciado cobro coactivo.','Al año siguiente a su presentación, salvo que el contribuyente la corrija.'],0,
'La regla general de firmeza es de 3 años desde el vencimiento del plazo para declarar.','Art. 714 ET');
P('fisc','Una sociedad sujeta al régimen de precios de transferencia presentó su declaración de renta. Su término de firmeza es de:',
['Tres años, como la regla general.','Cinco años.','Diez años, por tratarse de operaciones internacionales.'],1,
'Las declaraciones sujetas a precios de transferencia y las que determinan o compensan pérdidas fiscales tienen firmeza de 5 años.','Art. 714 ET');
P('fisc','Un contribuyente quiere corregir su declaración para aumentar el impuesto. Puede hacerlo:',
['En cualquier momento, incluso después de la liquidación de revisión.','Solamente dentro del mes siguiente al vencimiento del plazo para declarar.','Dentro de los tres años siguientes al vencimiento del plazo para declarar y antes de que se le notifique requerimiento especial o pliego de cargos.'],2,
'La corrección voluntaria que aumenta el impuesto procede dentro de los 3 años siguientes y antes de notificado el requerimiento especial o pliego de cargos, liquidando sanción por corrección.','Art. 588 ET');
P('fisc','Al revisar una declaración de IVA observa que no tiene la firma del revisor fiscal, siendo el contribuyente obligado a tenerlo. Esta declaración:',
['Es válida, pero genera sanción por corrección.','Se tiene por no presentada.','Debe ser corregida de oficio por la DIAN mediante liquidación de corrección aritmética.'],1,
'La declaración se tiene por no presentada cuando se omite la firma del contador o revisor fiscal existiendo la obligación legal.','Art. 580 ET');
P('fisc','Durante la investigación no se logra probar un hecho que el contribuyente no estaba obligado a demostrar. Según el régimen probatorio tributario:',
['El vacío probatorio se resuelve a favor de la Administración.','Debe suspenderse la investigación hasta obtener la prueba.','El vacío probatorio se resuelve a favor del contribuyente.'],2,
'Los vacíos probatorios se resuelven a favor del contribuyente cuando no se encuentre obligado a probar determinados hechos (in dubio contra fiscum).','Art. 745 ET');
P('fisc','Los hechos consignados en las declaraciones tributarias:',
['Se consideran ciertos, siempre que no hayan sido desvirtuados por la Administración.','Carecen de valor probatorio hasta que la DIAN los verifique.','Solo tienen valor si están acompañados de certificación del revisor fiscal.'],0,
'Presunción de veracidad: los hechos consignados en las declaraciones se consideran ciertos mientras no sean desvirtuados.','Art. 746 ET');
P('fisc','Usted necesita información de un tercero proveedor para cruzarla con la declaración de un contribuyente investigado. El instrumento adecuado es:',
['Un requerimiento especial al proveedor.','Un requerimiento ordinario de información con un plazo de respuesta no inferior a 15 días calendario.','Un emplazamiento para declarar al proveedor.'],1,
'El requerimiento ordinario permite solicitar información a contribuyentes y terceros; el plazo de respuesta no puede ser inferior a 15 días calendario.','Arts. 684 y 686 ET');
P('fisc','¿Cuál de las siguientes NO es una facultad de fiscalización de la DIAN?',
['Ordenar la exhibición de libros de contabilidad y sus soportes.','Citar o requerir al contribuyente o a terceros para que rindan informes.','Imponer penas privativas de la libertad por evasión.'],2,
'Las penas privativas de la libertad son competencia de los jueces penales. Las otras son facultades del art. 684 ET.','Art. 684 ET');
P('fisc','Al practicar una inspección contable en la sede del contribuyente, usted debe:',
['Levantar un acta firmada por los funcionarios y el contribuyente, y entregarle copia.','Llevarse los libros originales a la oficina de la DIAN sin dejar constancia.','Limitarse a tomar fotografías sin levantar acta para agilizar.'],0,
'De la inspección contable se levanta acta que firman los funcionarios y las partes, y se entrega copia; el acta hace parte de la actuación.','Art. 782 ET');
P('fisc','El contribuyente interpone recurso de reconsideración contra una liquidación oficial de revisión. El plazo para interponerlo es:',
['Diez días hábiles siguientes a la notificación.','Dos meses siguientes a la notificación del acto.','Tres meses siguientes a la notificación del acto.'],1,
'El recurso de reconsideración se interpone dentro de los 2 meses siguientes a la notificación.','Art. 720 ET');
P('fisc','La DIAN no resolvió dentro del año siguiente un recurso de reconsideración interpuesto en debida forma. La consecuencia es:',
['El recurso se entiende fallado a favor del recurrente (silencio administrativo positivo).','El recurso se entiende negado y el contribuyente puede acudir a la jurisdicción.','El término se prorroga automáticamente por seis meses.'],0,
'Si la DIAN no resuelve en el término de 1 año, opera el silencio administrativo positivo, que debe ser declarado de oficio o a petición.','Arts. 732 y 734 ET');
P('fisc','Una sociedad celebra una serie de contratos sin propósito comercial real, cuyo único efecto es trasladar utilidades para reducir el impuesto. Esta conducta corresponde a:',
['Planeación tributaria legítima que la DIAN no puede cuestionar.','Error de apreciación que no genera consecuencias.','Abuso en materia tributaria, que permite a la DIAN recaracterizar las operaciones.'],2,
'El abuso tributario es el uso de operaciones artificiales, sin propósito económico o comercial, para obtener un provecho tributario. La DIAN puede desconocerlas y recaracterizarlas.','Art. 869 ET');
P('fisc','Un contribuyente con saldo a favor en renta solicita devolución. La solicitud debe presentarse:',
['Dentro del mes siguiente a la presentación de la declaración.','Dentro de los cinco años siguientes al vencimiento del plazo para declarar.','Dentro de los dos años siguientes al vencimiento del plazo para declarar.'],2,
'La devolución de saldos a favor debe solicitarse a más tardar 2 años después del vencimiento del plazo para declarar.','Art. 854 ET');
P('fisc','La DIAN debe devolver un saldo a favor, cuando no hay garantía, dentro de los:',
['Cincuenta días hábiles siguientes a la fecha de la solicitud presentada oportunamente y en debida forma.','Diez días hábiles siguientes a la solicitud.','Seis meses siguientes a la solicitud.'],0,
'El término general es de 50 días hábiles; con garantía, 20 días hábiles.','Arts. 855 y 860 ET');
P('fisc','La acción de cobro de las obligaciones tributarias prescribe, como regla general, en:',
['Tres años.','Cinco años.','Diez años.'],1,
'La acción de cobro prescribe en 5 años contados según el art. 817 ET.','Art. 817 ET');
P('fisc','Al notificar un acto de determinación, el contribuyente había informado expresamente una dirección procesal en la respuesta al requerimiento. La DIAN debe:',
['Notificar a la dirección del RUT, por ser la única válida.','Notificar a la dirección procesal informada para ese proceso.','Notificar por aviso en la página web, sin enviar el acto.'],1,
'Si dentro del proceso se informa una dirección procesal, la DIAN debe notificar a esa dirección.','Art. 564 ET');
P('fisc','En un proceso de determinación encuentra que el contribuyente cometió un error aritmético al sumar sus ingresos que generó un menor impuesto. El acto procedente es:',
['La liquidación oficial de corrección aritmética.','La liquidación de aforo.','La resolución que declara la declaración como no presentada.'],0,
'Los errores aritméticos (sumas, operaciones, tarifas mal aplicadas) se corrigen mediante liquidación de corrección aritmética.','Arts. 697-698 ET');
P('fisc','La liquidación oficial de revisión solo puede referirse a los hechos contemplados en el requerimiento especial o en su ampliación. Este es el principio de:',
['Favorabilidad.','Correspondencia entre la declaración, el requerimiento y la liquidación.','Gradualidad de la sanción.'],1,
'Debe existir correspondencia: la liquidación de revisión se contrae a la declaración y a los hechos del requerimiento o su ampliación.','Art. 711 ET');
P('fisc','Un contribuyente investigado le solicita copia del expediente y la oportunidad de presentar pruebas antes de la decisión. Usted debe:',
['Negarlo, porque el expediente tributario es reservado incluso para él.','Permitirlo, porque el debido proceso garantiza el derecho de defensa y contradicción.','Exigirle que primero pague el mayor impuesto propuesto.'],1,
'El contribuyente tiene derecho a conocer el expediente y a controvertir pruebas (art. 29 C.P.). La reserva opera frente a terceros, no frente al propio interesado.','Art. 29 C.P.; art. 583 ET');
P('fisc','Una precrítica de insumos (función 1 del empleo) muestra que un contribuyente reportó ingresos muy inferiores a lo que informan terceros en exógena. Lo procedente es:',
['Archivar el insumo, porque la exógena no es prueba.','Clasificar el insumo y establecer la pertinencia de iniciar una investigación, documentando el análisis.','Proferir de inmediato una liquidación oficial de revisión.'],1,
'La precrítica busca clasificar los insumos y determinar si es pertinente abrir investigación, según procedimientos institucionales. La liquidación requiere todo el proceso previo.','Función esencial 1 – Ficha AT-FL-3007');
P('fisc','Recibe una denuncia anónima, detallada y verificable, sobre ventas sin factura en un establecimiento. Según la función 2 del empleo, usted debe:',
['Descartarla por ser anónima.','Hacer el análisis preliminar y establecer la pertinencia de iniciar una acción de fiscalización.','Trasladarla directamente a la Fiscalía.'],1,
'El análisis preliminar de denuncias permite establecer si procede una acción de fiscalización, de acuerdo con la normativa y los lineamientos.','Función esencial 2 – Ficha AT-FL-3007');

// ===================== RÉGIMEN SANCIONATORIO =====================
P('sanc','Una sanción tributaria liquidada da un valor inferior al mínimo legal. El valor mínimo de cualquier sanción, incluidas las que liquide el contribuyente, es:',
['5 UVT.','10 UVT.','20 UVT.'],1,'La sanción mínima es equivalente a 10 UVT.','Art. 639 ET');
P('sanc','Un contribuyente presenta su declaración de renta dos meses y diez días después del vencimiento, sin que haya mediado emplazamiento. La sanción por extemporaneidad es:',
['5 % del impuesto a cargo por cada mes o fracción de mes, es decir, 15 %.','10 % por cada mes o fracción, es decir, 30 %.','5 % por cada mes completo, es decir, 10 %.'],0,
'Antes del emplazamiento: 5 % por mes o fracción (3 fracciones = 15 %), sin exceder el 100 % del impuesto.','Art. 641 ET');
P('sanc','Si el contribuyente declara después de notificado el emplazamiento para declarar, la sanción por extemporaneidad será:',
['5 % por mes o fracción, sin exceder el 100 %.','10 % por mes o fracción, sin exceder el 200 % del impuesto.','20 % del valor de los ingresos brutos.'],1,
'Después del emplazamiento: 10 % por mes o fracción, máximo 200 % del impuesto o retención.','Art. 642 ET');
P('sanc','La sanción por no declarar renta, cuando la DIAN tiene información sobre ingresos y consignaciones, equivale al:',
['20 % del valor de las consignaciones bancarias o de los ingresos brutos, el que fuere superior.','100 % del impuesto que se hubiera liquidado.','5 % del patrimonio líquido.'],0,
'La sanción por no declarar renta es del 20 % del mayor valor entre consignaciones e ingresos brutos.','Art. 643 ET');
P('sanc','Un contribuyente corrige voluntariamente su declaración, antes de cualquier emplazamiento, aumentando el saldo a pagar. La sanción por corrección es:',
['20 % del mayor valor a pagar.','10 % del mayor valor a pagar.','No hay sanción si corrige voluntariamente.'],1,
'La sanción por corrección es del 10 % del mayor valor; del 20 % si se corrige después de notificado el emplazamiento para corregir o el auto de inspección.','Art. 644 ET');
P('sanc','¿Cuál de las siguientes situaciones NO constituye inexactitud sancionable?',
['Incluir costos de proveedores inexistentes.','Omitir ingresos gravados.','Una diferencia de criterio sobre la interpretación del derecho aplicable, cuando los hechos declarados son completos y verdaderos.'],2,
'La diferencia de criterio no constituye inexactitud siempre que los hechos y cifras sean completos y verdaderos.','Art. 647 ET');
P('sanc','Como regla general, la sanción por inexactitud equivale al:',
['10 % de la diferencia.','50 % de la diferencia.','100 % de la diferencia entre el saldo a pagar determinado por la DIAN y el declarado.'],2,
'La regla general es el 100 % de la diferencia; hay tarifas mayores en casos agravados (costos inexistentes, proveedores ficticios, etc.).','Art. 648 ET');
P('sanc','Para imponer una sanción en resolución independiente (no dentro de una liquidación oficial), la DIAN debe:',
['Notificar previamente un pliego de cargos y dar oportunidad de respuesta.','Imponerla de plano para garantizar celeridad.','Esperar a que el contribuyente corrija voluntariamente.'],0,
'Las sanciones impuestas en resolución independiente exigen pliego de cargos previo, en garantía del debido proceso.','Arts. 637-638 ET');
P('sanc','En una visita de control a un establecimiento comercial se comprueba que no expide factura. La sanción típica es:',
['Multa del 100 % de las ventas del año.','Clausura del establecimiento, con imposición del sello "CERRADO POR EVASIÓN".','Cancelación del RUT.'],1,
'La clausura del establecimiento (con el sello "cerrado por evasión") procede, entre otras causales, por no expedir factura.','Art. 657 ET');
P('sanc','El principio sancionatorio según el cual la sanción debe corresponder a la gravedad de la falta y al daño causado se denomina:',
['Proporcionalidad.','Favorabilidad.','Legalidad.'],0,
'La proporcionalidad exige que la sanción sea adecuada a la gravedad de la conducta y al daño; la gradualidad permite reducirla según la conducta del infractor.','Art. 640 ET; Ley 1819 de 2016');
P('sanc','Durante el proceso sancionatorio entra en vigencia una ley que establece una sanción menor para la misma conducta. En virtud del principio de favorabilidad:',
['Se aplica la ley vigente cuando ocurrió la conducta, sin excepción.','Se aplica la norma más favorable al infractor, aunque sea posterior.','Se aplica el promedio de ambas sanciones.'],1,
'El principio de favorabilidad permite aplicar la ley permisiva o favorable aun cuando sea posterior a la conducta.','Art. 640 ET; art. 29 C.P.');
P('sanc','Un contribuyente soporta sus costos con facturas de una sociedad declarada por la DIAN como proveedor ficticio. Esos costos:',
['Son aceptados si el pago se hizo por medios bancarios.','No son reconocidos fiscalmente.','Son aceptados en un 50 %.'],1,
'No son deducibles los costos y deducciones soportados en operaciones con proveedores ficticios, y hay sanción agravada.','Art. 671 ET');

// ===================== SISTEMA TRIBUTARIO =====================
P('sist','¿Cuáles son los elementos esenciales del tributo que debe fijar directamente la ley, ordenanza o acuerdo?',
['Sujeto activo, sujeto pasivo, hecho generador, base gravable y tarifa.','Plazo, formulario, sanción y lugar de pago.','Hecho generador, sanción y procedimiento de cobro.'],0,
'El art. 338 de la Constitución exige que la norma fije sujetos activos y pasivos, hechos y bases gravables y tarifas.','Art. 338 C.P.');
P('sist','¿Cuál de estos tributos NO es administrado por la DIAN?',
['Impuesto sobre las ventas (IVA).','Gravamen a los movimientos financieros (GMF).','Impuesto de industria y comercio (ICA).'],2,
'El ICA es un impuesto municipal administrado por los municipios y distritos.','Normativa tributaria');
P('sist','Según el Estatuto Tributario, el IVA se causa sobre:',
['La venta de bienes, la prestación de servicios, la importación de bienes y la circulación, venta u operación de juegos de suerte y azar.','Únicamente la venta de bienes muebles.','La renta líquida de las personas jurídicas.'],0,
'Son hechos generadores del IVA: ventas, servicios, importaciones y juegos de suerte y azar (salvo loterías y juegos de suerte y azar operados exclusivamente por internet en ciertos casos).','Art. 420 ET');
P('sist','La tarifa general del IVA vigente es:',['16 %.','19 %.','21 %.'],1,'La tarifa general del IVA es del 19 %.','Art. 468 ET');
P('sist','La diferencia práctica entre bienes exentos y excluidos de IVA es que:',
['Los exentos están gravados a tarifa cero y otorgan derecho a impuestos descontables y devolución; los excluidos no causan IVA.','Los excluidos dan derecho a devolución y los exentos no.','No existe diferencia; son sinónimos.'],0,
'Los productores de bienes exentos son responsables, pueden descontar el IVA pagado y pedir devolución; los excluidos no causan el impuesto.','Arts. 424 y 477 ET');
P('sist','La retención en la fuente tiene por objeto:',
['Sancionar a los contribuyentes morosos.','Conseguir en forma gradual que el impuesto se recaude en lo posible dentro del mismo ejercicio gravable en que se cause.','Reemplazar la obligación de declarar.'],1,
'La retención en la fuente es un mecanismo de recaudo anticipado.','Art. 367 ET');
P('sist','Un ciudadano extranjero permaneció en Colombia 200 días continuos dentro de un periodo de 365 días. Para efectos tributarios es:',
['Residente fiscal, porque superó 183 días calendario.','No residente, porque no tiene nacionalidad colombiana.','Residente, solo si tiene cuenta bancaria en Colombia.'],0,
'Es residente quien permanece más de 183 días calendario, continuos o discontinuos, en un periodo de 365 días.','Art. 10 ET');
P('sist','El Registro Único Tributario (RUT) es:',
['El mecanismo único para identificar, ubicar y clasificar a los sujetos de obligaciones administradas y controladas por la DIAN.','Un registro voluntario para quienes desean facturar.','El registro de deudores morosos del Estado.'],0,
'Así lo define el art. 555-2 ET.','Art. 555-2 ET');
P('sist','La obligación de presentar declaraciones, inscribirse en el RUT y expedir factura corresponde a:',
['Obligaciones sustanciales.','Obligaciones formales.','Obligaciones aduaneras.'],1,
'La obligación sustancial es pagar el tributo; los deberes de declarar, informar, facturar o inscribirse son obligaciones formales.','Art. 1 ET y ss.');
P('sist','El sistema tributario colombiano, según la Constitución, se funda en los principios de:',
['Legalidad, solidaridad y universalidad.','Equidad, eficiencia y progresividad.','Celeridad, eficacia y economía.'],1,
'Art. 363 C.P.: equidad, eficiencia y progresividad; además, las leyes tributarias no se aplican con retroactividad.','Art. 363 C.P.');
P('sist','Los tributos aduaneros que se liquidan en una importación ordinaria comprenden principalmente:',
['El gravamen arancelario y el IVA a las importaciones.','El impuesto de renta y el ICA.','El GMF y el impuesto de timbre.'],0,
'Los tributos aduaneros comprenden los derechos de aduana (arancel) y el IVA a la importación, entre otros.','Decreto 1165 de 2019');
