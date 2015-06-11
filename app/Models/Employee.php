<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

final class Employee extends Model {
  public $timestamps = false;
  protected $fillable = array('firstname', 'lastname', 'pin', 'date_of_employment');
}
