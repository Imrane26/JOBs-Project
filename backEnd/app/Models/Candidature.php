<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidature extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';

    public function candidat()
    {
        return $this->belongsTo(Candidat::class, 'idCandidat');
    }

    public function offre()
    {
        return $this->belongsTo(Offre::class, 'idOffre');
    }
}
