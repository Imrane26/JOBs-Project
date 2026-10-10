<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::connection('mongodb')->create('offres', function (Blueprint $table) {
            $table->increments('id');
            $table->string('titre');
            $table->text('description');
            $table->date('date_publication');
            $table->string('typeContrat');
            $table->string('salaire');
            $table->string('lieu');

            // Relationships
            $table->index('idEntreprises'); 

            // Additional fields
            $table->array('competences');
            $table->array('experiences');
            $table->text('autres-informations');
            $table->string('logo')->nullable();
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            $table->nested('commentaires', function (Blueprint $table) {
            $table->index('idCommentateur');
            $table->string('contenu'); 
            $table->date('date_creation');
            });
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::connection('mongodb')->drop('offres');
    }
};
