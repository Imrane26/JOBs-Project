<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class recruteurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::connection('mongodb')->collection('recruteurs')->insert([
            [
                'idEntreprise' => 1,
                'prenom' => 'John',
                'nom' => 'Doe',
                'adresse' => '123 Rue des Employeurs',
                'email' => 'johnh.doe@example.com',
                'date_naissance' => '1990-01-01',
                'mot_de_passe' => bcrypt('password'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'idEntreprise' => 2,
                'prenom' => 'Jane',
                'nom' => 'Smith',
                'adresse' => '456 Avenue des Employeurs',
                'email' => 'janne.smith@example.com',
                'date_naissance' => '1985-05-15',
                'mot_de_passe' => bcrypt('password123'),
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Ajoutez d'autres employeurs au besoin
        ]);
    }
}
