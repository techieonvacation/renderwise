import {
    Clipboard,
    Users,
    Zap,
} from 'lucide-react';
import { Strategy } from './type';

export const offerData: Strategy[] = [
    {
        icon: Clipboard,
        title: 'Contract, Contract-to-Hire & Placement',
        description: 'We offer flexible staffing solutions including short-term contracts, contract-to-hire arrangements, and direct placement services. Our comprehensive approach ensures you get the right talent for your specific needs, whether it\'s project-based work or long-term team building.',
    },
    {
        icon: Users,
        title: 'Pre-Vetted Tech Talent',
        description: 'Our rigorous screening process ensures you receive only the highest quality tech professionals. We thoroughly assess technical skills, experience, and cultural fit before presenting candidates, saving you time and reducing hiring risks.',
    },
    {
        icon: Zap,
        title: 'Rapid Deployment',
        description: 'Get qualified tech professionals on your team quickly with our streamlined deployment process. We understand the urgency of tech projects and can have pre-vetted candidates ready for interviews within 24-48 hours of your request.',
    },
]; 