<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Candidat extends Model
{
    use HasFactory;
    protected $collection = 'candidats';
    protected $connection = 'mongodb';

    public function user()
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function candidatures()
    {
        return $this->hasMany(Candidature::class, 'idCandidat');
    }
}
