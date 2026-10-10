<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class candidatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Supprime toutes les entrées existantes dans la collection avant de créer les nouveaux enregistrements
        DB::connection('mongodb')->collection('candidats')->delete();

        // Crée les nouveaux enregistrements dans la collection
        DB::connection('mongodb')->collection('candidats')->insert([
            [
                'prenom' => 'John',
                'nom' => 'Doe',
                'adresse' => '123 Rue des Employeurs',
                'email' => 'john.doe@example.com',
                'date_naissance' => '1990-01-01',
                'mot_de_passe' => bcrypt('password'),
                'education' => [
                    [
                        'diplome' => 'Baccalauréat',
                        'institut' => 'Université XYZ',
                        'date_debut' => '2008-09-01',
                        'date_fin' => '2011-06-01',
                        'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                    ],
                    // Ajoutez d'autres éducations au besoin
                ],
                'experiences' => [
                    [
                        'poste' => 'Développeur Web',
                        'entreprise' => 'Entreprise ABC',
                        'date_debut' => '2011-07-01',
                        'date_fin' => '2015-12-31',
                        'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                    ],
                    // Ajoutez d'autres expériences au besoin
                ],
                'competences' => ['HTML', 'CSS', 'JavaScript'],
                'telephone' => '123456789',
                'created_at' => now(),
                'updated_at' => now()
            ],
            // Ajoutez d'autres employeurs au besoin
        ]);
    }
}
