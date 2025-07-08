import { Globe, Shield, Zap } from "lucide-react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

const ContactHeader = () => {
    return (
        <section className="relative">
            <div className="grid lg:grid-cols-2">
                <div className="bg-primary px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
                    <div className="mx-auto max-w-lg">
                        <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                            Let&apos;s build your digital future together
                        </h1>
                        <p className="mt-6 text-xl text-primary-foreground/90">
                            Our team of experts is ready to help you transform your business with cutting-edge technology solutions.
                        </p>

                        <div className="mt-10 space-y-4">
                            <div className="flex items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                                    <CheckCircle className="h-6 w-6 text-secondary-foreground" />
                                </div>
                                <p className="ml-4 text-lg text-primary-foreground">Industry-leading expertise</p>
                            </div>

                            <div className="flex items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                                    <Globe className="h-6 w-6 text-secondary-foreground" />
                                </div>
                                <p className="ml-4 text-lg text-primary-foreground">Global reach, local touch</p>
                            </div>

                            <div className="flex items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                                    <Shield className="h-6 w-6 text-secondary-foreground" />
                                </div>
                                <p className="ml-4 text-lg text-primary-foreground">Enterprise-grade security</p>
                            </div>

                            <div className="flex items-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                                    <Zap className="h-6 w-6 text-secondary-foreground" />
                                </div>
                                <p className="ml-4 text-lg text-primary-foreground">Rapid deployment</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <Image
                        src="https://media.istockphoto.com/id/1271752802/photo/phone-and-e-mail-icons-on-wooden-cubes-with-contact-us-text-on-blue-background-web-page.jpg?s=612x612&w=0&k=20&c=dk9oPaDy_L9mv_icOMgsFGzEDrX0NUI3I8xBQ-DAxQM="
                        width={800}
                        height={500}
                        alt="IT professionals in a modern office"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default ContactHeader;
