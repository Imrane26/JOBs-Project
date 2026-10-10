<?php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use MongoDB\Client;

class MongoServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Client::class, function ($app) {
            $host = env('MONGO_DB_HOST', '127.0.0.1');
            $port = env('MONGO_DB_PORT', 27017);
            $database = env('MONGO_DB_DATABASE');
            $username = env('MONGO_DB_USERNAME');
            $password = env('MONGO_DB_PASSWORD');

            $uri = "mongodb://{$username}:{$password}@{$host}:{$port}";

            return new Client($uri);
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
