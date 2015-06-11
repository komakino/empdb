<?php namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmployeeController extends Controller {

    public function index(Request $request){
      $input = $request->all();
      $query = Employee::orderBy($input['orderBy'], $input['order']);

      if ($search = $request->get('search')) {
          $query->where('firstname', 'LIKE', "%$search%");
          $query->orWhere('lastname', 'LIKE', "%$search%");
      }

      $count = $query->count();
      $employees = $query
        ->take($input['limit'])
        ->skip($input['start'])
        ->get();

      return response()->json([
        'items' => $employees,
        'count' => $count
      ]);
    }

    public function store(Request $request){
      $employee = Employee::create($request->all());
      return response()->json($employee);
    }

    public function show($id){
      $employee = Employee::find($id);
      return response()->json($employee);
    }

    public function update($id, Request $request){
      $employee = Employee::find($id);
      $employee->update($request->all());
      return response()->json($employee);
    }

    public function destroy($id){
      $employee = Employee::find($id);
      $result = $employee->delete();
      return response()->json($result);
    }


}
