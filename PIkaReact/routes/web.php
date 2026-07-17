<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BusinessOnboardingController;

Route::get('/', [BusinessOnboardingController::class, 'index'])->name('onboarding');
