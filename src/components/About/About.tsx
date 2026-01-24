const About = () => {
  return (
    <section className="py-24 px-4 max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-8">About Me</h2>
      <p className="text-lg text-neutral-300 leading-relaxed">
        I’m a final-year Computer Science student focused on building practical, production-ready web applications rather than demo projects that never ship. I work primarily with React, TypeScript, and modern frontend tooling, and I integrate real backend services like Supabase, PostgreSQL, and authentication systems to build complete, usable products. I care about clean architecture, predictable state, and systems that don’t break the moment real users touch them. My recent work includes building a no-code portfolio platform with OTP-based authentication, deployment limits, public URLs, and live previews — handling real issues like routing, security, build failures, and production deployment instead of avoiding them. I actively use AI tools as accelerators, not replacements — to reason faster, debug deeper, and iterate smarter. I still verify, refactor, and own every line of code that ships. I’m interested in roles and projects where I can work on real products, learn from strong engineers, and improve systems that people actually use.
      </p>
    </section>
  );
};

export default About;