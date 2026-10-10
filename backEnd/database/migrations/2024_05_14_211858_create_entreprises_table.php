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
        Schema::connection('mongodb')->create('entreprises', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nom');
            $table->string('siret')->nullable();
            $table->string('adresse');
            $table->string('activite');
            $table->string('site_web')->nullable();
            $table->string('logo')->nullable();


            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::connection('mongodb')->drop('entreprises');
    }
};
