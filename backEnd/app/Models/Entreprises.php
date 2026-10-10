<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Entreprises extends Model
{
    use HasFactory;
    protected $collection = 'entreprises';


    public function reucruteur(): HasMany
    {
        return $this->hasMany(Recruteur::class);
    }
    public function offre(): HasMany
    {
        return $this->hasMany(Offre::class);
    }
}
