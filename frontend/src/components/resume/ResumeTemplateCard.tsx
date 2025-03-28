import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

interface ResumeTemplateCardProps {
  title: string;
  description: string;
  price: string;
  roles: string[];
  onClick: () => void;
}

const ResumeTemplateCard: React.FC<ResumeTemplateCardProps> = ({
  title,
  description,
  price,
  roles,
  onClick
}) => {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="font-medium mb-2">Includes templates for:</p>
        <ul className="list-disc pl-5 space-y-1">
          {roles.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-lg font-bold">{price}</p>
        <Button onClick={onClick}>Purchase</Button>
      </CardFooter>
    </Card>
  );
};

export default ResumeTemplateCard;
