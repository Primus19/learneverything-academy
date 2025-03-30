import React from 'react';
import Card from "../ui/card-direct/Card.jsx"
import CardContent from "../ui/card-direct/CardContent.jsx"
import CardDescription from "../ui/card-direct/CardDescription.jsx"
import CardFooter from "../ui/card-direct/CardFooter.jsx"
import CardHeader from "../ui/card-direct/CardHeader.jsx"
import CardTitle from "../ui/card-direct/CardTitle.jsx";
import { Button } from "../ui/button";

interface ResumeTemplateCardProps {
  title: string;
  description: string;
  price: string;
  roles: string[];
  onClick?: () => void; // Make optional
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
