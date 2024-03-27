<?php
require 'coneccion.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);
require 'switch.php';
/* require 'switch.php'; */
//$respuesta = mysqli_query($conn, "SELECT comida, garrafones, despensa, ahorro, gas, luz, psic, agua, Yansen, Gustavo FROM 01generales WHERE tipoquincena= '".$x->tipo."'");
mysqli_query($conn, "INSERT INTO banamexmsi (tipo, Concepto, cantidad, MSI, MesRegistro, comprado) VALUES ('MSI', '".$x->newConcept."', '".$x->newValue."', 1, $quin, '".$x -> quincena."')");

$respuesta = mysqli_query($conn, "SELECT Concepto, cantidad, MSI, MesRegistro FROM banamexmsi WHERE MSI >= 0");

$row = mysqli_fetch_all($respuesta);
//echo $row;
echo json_encode ($row, JSON_NUMERIC_CHECK);
?>