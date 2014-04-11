<?php

$errors       = '';
$i            = 1;
$error_inputs = array();

//Check For POST Data
if ( !empty( $_POST ) ) {

	// if ( !$form_token || $form_token != 'i4r6bwx4Ywxh6WyW' ) {

	// 	header('Content-Type: application/json');
	// 	$response = array(
	// 		'code'    => 400,
	// 		'result'  => 'error',
	// 		'message' => 'token not provided or incorrect'
	// 	);
	// 	echo json_encode( $response ); die();

	// }

	if ( !isset($_POST['first-name']) || empty($_POST['first-name']) ) {
		$errors .= '<li>First name is required</li>';
		$error_inputs['"input'.strval($i).'"'] = json_encode(array('first-name', 'First name is required')); $i++;
	}

	if ( !isset($_POST['last-name']) || empty($_POST['last-name']) ) {
		$errors .= '<li>Last last is required</li>';
		$error_inputs['"input'.strval($i).'"'] = json_encode(array('last-name', 'Last name is required')); $i++;
	}

	$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);

	if ( empty($_POST['email']) || !$email ) {
		$errors .= '<li>Invalid Email Address</li>';
		$error_inputs['"input'.strval($i).'"'] = json_encode(array('email', 'Invalid Email Address')); $i++;
	}

	if ( isset($_POST['phone']) ) {
		$phone = preg_replace("/[^0-9]/", "", $_POST['phone']);
		
		if ( strlen($phone) < 10 || strlen($phone) > 20 ) {
			$errors .= '<li>Valid U.S.A. or International phone number is required</li>';
			$error_inputs['"input'.strval($i).'"'] = json_encode(array('phone', 'Valid U.S.A. or International phone number is required')); $i++;
		}

	}

	// if ( !isset($_POST['program']) || empty( $_POST['program'] ) ) {
	// 	$errors .= '<li>Please select your desired program</li>';
	// 	$error_inputs['"input'.strval($i).'"'] = json_encode(array('program', 'Please select your desired program')); $i++;
	// }

	//Return Error JSON
	if ( !empty( $errors ) ) {

		$response = array(
			'code'    => 400,
			'result'  => 'error',
			'message' => '<h4>Please Correct The Following Errors</h4><ul class="errors">'.$errors.'</ul>',
			'inputs'  => '[' . json_encode($error_inputs) . ']'
		);
		echo json_encode( $response ); die();

	} else {

		header('Content-Type: application/json');
		$response = array(
			'code'    => 200,
			'result'  => 'success',
			'message' => 'Did stuff with the form'
		);
		echo json_encode( $response ); die();

	}

} else {

	header('Content-Type: application/json');
	$response = array(
		'code'    => 400,
		'result'  => 'error',
		'message' => 'no data posted'
	);
	echo json_encode( $response ); die();

}