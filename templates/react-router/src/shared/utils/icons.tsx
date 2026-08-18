import * as LucideIcons from 'lucide-react';

export const iconResolver = (icon?: string) => {
     if(!icon) return null
     const key = (icon ? icon.charAt(0).toUpperCase() + icon.slice(1) : "ScrollText") as keyof typeof LucideIcons;
     const Icon = LucideIcons[key] as React.ComponentType<{ size?: number }> | undefined;
     return Icon ? <Icon size={15}  /> : null;
 }
