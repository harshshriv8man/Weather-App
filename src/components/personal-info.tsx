import React from 'react';
import { Card, CardContent } from './ui/card'; // Assuming you have a Card component in your UI folder

const PersonalInfoCard = () => {
  return (
    <Card className="space-y-4 bg-gray-800 text-white p-6 rounded-lg shadow-md">
      <CardContent>
        <h2 className="text-2xl font-bold">Made By: Harsh Shrivastav</h2>
        <p className="mt-2 text-sm">
          The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.
        </p>
        <p className="mt-2 text-sm">
          Our Product Manager Accelerator community are ambitious and committed. Through our program, they have learned, honed, and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.
        </p>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
