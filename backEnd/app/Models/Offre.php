<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Offre extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'offres';

    public function entreprise(): BelongsTo
    {
        return $this->belongsTo(Entreprises::class);
    }


    public function candidatures()
    {
        return $this->hasMany(Candidature::class, 'idOffre');
    }
}
