'use client';

import { motion } from 'framer-motion';
import { Battery, Linkedin, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { label: 'Sobre Nosotros', href: '#' },
            { label: 'Carreras', href: '#' },
            { label: 'Prensa', href: '#' },
            { label: 'Blog', href: '#' },
        ],
        product: [
            { label: 'Tecnología', href: '#technology' },
            { label: 'Modelos', href: '#models' },
            { label: 'Suscripción', href: '#subscription' },
            { label: 'App Móvil', href: '#' },
        ],
        investors: [
            { label: 'Para Inversores', href: '#' },
            { label: 'Relación con Accionistas', href: '#' },
            { label: 'Informes Financieros', href: '#' },
            { label: 'ESG', href: '#' },
        ],
        legal: [
            { label: 'Términos de Uso', href: '#' },
            { label: 'Política de Privacidad', href: '#' },
            { label: 'Cookies', href: '#' },
            { label: 'Garantía', href: '#' },
        ],
    };

    const socialLinks = [
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Youtube, href: '#', label: 'YouTube' },
    ];

    return (
        <footer className="bg-surface/50 border-t border-white/5" id="footer">
            {/* Main Footer */}
            <div className="container py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-3 mb-6 group">
                            <div className="relative">
                                <Battery className="w-8 h-8 text-primary" />
                                <div className="absolute inset-0 blur-lg bg-primary/30 group-hover:bg-primary/50 transition-all" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">BATISY</span>
                        </a>

                        <p className="text-muted text-sm mb-6 max-w-xs">
                            Revolucionando la movilidad urbana con baterías modulares.
                            El futuro de los vehículos eléctricos está aquí.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-muted">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>Madrid, España</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted">
                                <Mail className="w-4 h-4 text-primary" />
                                <a href="mailto:info@batisy.tech" className="hover:text-foreground transition-colors">
                                    info@batisy.tech
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted">
                                <Phone className="w-4 h-4 text-primary" />
                                <a href="tel:+34900123456" className="hover:text-foreground transition-colors">
                                    900 123 456
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-6">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-surface-light flex items-center justify-center text-muted hover:text-primary hover:bg-primary/10 transition-all"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Compañía</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Producto</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Inversores</h4>
                        <ul className="space-y-3">
                            {footerLinks.investors.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-sm">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <a href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 mt-8">
                <div className="container py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-muted">
                            © {currentYear} BATISY. Todos los derechos reservados.
                        </p>

                        {/* Social Proof */}
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                                <span className="text-xs">🇪🇺</span>
                            </div>
                            <span className="text-sm text-muted">
                                Tecnología diseñada en Europa
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
