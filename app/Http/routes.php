<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$app->get('/', function() use ($app) {
  return view('spa');
});

function resource($uri, $controller) {
	global $app;
	$app->get($uri,              'App\Http\Controllers\\'.$controller.'@index');
//	$app->get($uri.'/create',    'App\Http\Controllers\\'.$controller.'@create');
	$app->post($uri,             'App\Http\Controllers\\'.$controller.'@store');
	$app->post($uri.'/{id}',      'App\Http\Controllers\\'.$controller.'@update');
    $app->get($uri.'/{id}',      'App\Http\Controllers\\'.$controller.'@show');
	$app->delete($uri.'/{id}',    'App\Http\Controllers\\'.$controller.'@destroy');
}

resource('employee','EmployeeController');
