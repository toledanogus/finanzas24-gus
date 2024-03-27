<?php
require 'coneccion.php';

$json_data = file_get_contents("php://input");
$x = json_decode($json_data);
require 'switch.php';


$resp = mysqli_query($conn, "SELECT cantidad FROM totalesbanamex WHERE quincena = $quin");

if (mysqli_num_rows($resp) > 0) {
    mysqli_query($conn, "UPDATE totalesbanamex SET cantidad = '".$x->cantidad."' WHERE quincena = $quin");
} else {
    mysqli_query($conn, "INSERT INTO totalesbanamex (cantidad, quincena) VALUES ('".$x->cantidad."', $quin)");
}

$respuesta = mysqli_query($conn, "SELECT cantidad, quincena FROM totalesbanamex WHERE quincena = $quin");

$row = mysqli_fetch_all($respuesta, MYSQLI_ASSOC);
echo json_encode($row, JSON_NUMERIC_CHECK);
?>
